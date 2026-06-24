import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSupplierDto,
  UpdateSupplierDto,
  CreateProductDto,
  UpdateProductDto,
  StockMovementDto,
  InventoryTransferDto,
} from './dto/inventory.dto';
import { StockMovementType } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async findSuppliers(tenantId: string) {
    return this.prisma.supplier.findMany({
      where: { tenantId, isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async createSupplier(tenantId: string, dto: CreateSupplierDto) {
    return this.prisma.supplier.create({ data: { tenantId, ...dto } });
  }

  async updateSupplier(id: string, tenantId: string, dto: UpdateSupplierDto) {
    const supplier = await this.prisma.supplier.findFirst({ where: { id, tenantId } });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return this.prisma.supplier.update({ where: { id }, data: dto });
  }

  async findProducts(tenantId: string, branchId?: string, page = 1, limit = 20) {
    const where = { tenantId, ...(branchId && { branchId }), isActive: true };

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { supplier: { select: { name: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOneProduct(id: string, tenantId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, tenantId },
      include: { supplier: true, stockMovements: { take: 20, orderBy: { createdAt: 'desc' } } },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async createProduct(tenantId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        tenantId,
        branchId: dto.branchId,
        sku: dto.sku,
        name: dto.name,
        nameAr: dto.nameAr,
        category: dto.category,
        unit: dto.unit ?? 'piece',
        quantity: dto.quantity ?? 0,
        minStock: dto.minStock ?? 5,
        costPrice: dto.costPrice,
        sellingPrice: dto.sellingPrice,
        supplierId: dto.supplierId,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
      },
    });
  }

  async updateProduct(id: string, tenantId: string, dto: UpdateProductDto) {
    await this.findOneProduct(id, tenantId);
    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
      },
    });
  }

  async recordStockMovement(productId: string, tenantId: string, dto: StockMovementDto) {
    const product = await this.findOneProduct(productId, tenantId);

    const isOut =
      dto.type === StockMovementType.STOCK_OUT ||
      dto.type === StockMovementType.TRANSFER_OUT;

    if (isOut && product.quantity < dto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const delta =
      dto.type === StockMovementType.STOCK_IN ||
      dto.type === StockMovementType.TRANSFER_IN ||
      dto.type === StockMovementType.ADJUSTMENT
        ? dto.quantity
        : -dto.quantity;

    const [movement] = await this.prisma.$transaction([
      this.prisma.stockMovement.create({
        data: {
          productId,
          branchId: product.branchId,
          type: dto.type,
          quantity: dto.quantity,
          notes: dto.notes,
          reference: dto.reference,
        },
      }),
      this.prisma.product.update({
        where: { id: productId },
        data: { quantity: { increment: delta } },
      }),
    ]);

    return movement;
  }

  async getStockMovements(productId: string, tenantId: string) {
    await this.findOneProduct(productId, tenantId);
    return this.prisma.stockMovement.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLowStockAlerts(tenantId: string, branchId?: string) {
    return this.prisma.product.findMany({
      where: {
        tenantId,
        isActive: true,
        ...(branchId && { branchId }),
      },
    }).then((products) =>
      products.filter((p) => p.quantity <= p.minStock),
    );
  }

  async createTransfer(dto: InventoryTransferDto) {
    return this.prisma.inventoryTransfer.create({ data: dto });
  }

  async findTransfers(fromBranchId?: string) {
    return this.prisma.inventoryTransfer.findMany({
      where: fromBranchId ? { fromBranchId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }
}
