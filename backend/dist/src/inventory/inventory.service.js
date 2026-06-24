"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let InventoryService = class InventoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findSuppliers(tenantId) {
        return this.prisma.supplier.findMany({
            where: { tenantId, isActive: true },
            orderBy: { name: 'asc' },
        });
    }
    async createSupplier(tenantId, dto) {
        return this.prisma.supplier.create({ data: { tenantId, ...dto } });
    }
    async updateSupplier(id, tenantId, dto) {
        const supplier = await this.prisma.supplier.findFirst({ where: { id, tenantId } });
        if (!supplier)
            throw new common_1.NotFoundException('Supplier not found');
        return this.prisma.supplier.update({ where: { id }, data: dto });
    }
    async findProducts(tenantId, branchId, page = 1, limit = 20) {
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
    async findOneProduct(id, tenantId) {
        const product = await this.prisma.product.findFirst({
            where: { id, tenantId },
            include: { supplier: true, stockMovements: { take: 20, orderBy: { createdAt: 'desc' } } },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async createProduct(tenantId, dto) {
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
    async updateProduct(id, tenantId, dto) {
        await this.findOneProduct(id, tenantId);
        return this.prisma.product.update({
            where: { id },
            data: {
                ...dto,
                expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
            },
        });
    }
    async recordStockMovement(productId, tenantId, dto) {
        const product = await this.findOneProduct(productId, tenantId);
        const isOut = dto.type === client_1.StockMovementType.STOCK_OUT ||
            dto.type === client_1.StockMovementType.TRANSFER_OUT;
        if (isOut && product.quantity < dto.quantity) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        const delta = dto.type === client_1.StockMovementType.STOCK_IN ||
            dto.type === client_1.StockMovementType.TRANSFER_IN ||
            dto.type === client_1.StockMovementType.ADJUSTMENT
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
    async getStockMovements(productId, tenantId) {
        await this.findOneProduct(productId, tenantId);
        return this.prisma.stockMovement.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getLowStockAlerts(tenantId, branchId) {
        return this.prisma.product.findMany({
            where: {
                tenantId,
                isActive: true,
                ...(branchId && { branchId }),
            },
        }).then((products) => products.filter((p) => p.quantity <= p.minStock));
    }
    async createTransfer(dto) {
        return this.prisma.inventoryTransfer.create({ data: dto });
    }
    async findTransfers(fromBranchId) {
        return this.prisma.inventoryTransfer.findMany({
            where: fromBranchId ? { fromBranchId } : {},
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map