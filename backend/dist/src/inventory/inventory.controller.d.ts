import { InventoryService } from './inventory.service';
import { CreateSupplierDto, UpdateSupplierDto, CreateProductDto, UpdateProductDto, StockMovementDto, InventoryTransferDto } from './dto/inventory.dto';
export declare class InventoryController {
    private inventoryService;
    constructor(inventoryService: InventoryService);
    findSuppliers(tenantId: string): Promise<{
        email: string | null;
        tenantId: string;
        id: string;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
    }[]>;
    createSupplier(tenantId: string, dto: CreateSupplierDto): Promise<{
        email: string | null;
        tenantId: string;
        id: string;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
    }>;
    updateSupplier(id: string, tenantId: string, dto: UpdateSupplierDto): Promise<{
        email: string | null;
        tenantId: string;
        id: string;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
    }>;
    findProducts(tenantId: string, branchId?: string, page?: number, limit?: number): Promise<{
        data: ({
            supplier: {
                name: string;
            } | null;
        } & {
            tenantId: string;
            branchId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            quantity: number;
            category: string;
            sku: string;
            unit: string;
            minStock: number;
            costPrice: import("@prisma/client/runtime/library").Decimal;
            sellingPrice: import("@prisma/client/runtime/library").Decimal;
            supplierId: string | null;
            expiryDate: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    lowStock(tenantId: string, branchId?: string): Promise<{
        tenantId: string;
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        quantity: number;
        category: string;
        sku: string;
        unit: string;
        minStock: number;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellingPrice: import("@prisma/client/runtime/library").Decimal;
        supplierId: string | null;
        expiryDate: Date | null;
    }[]>;
    findOneProduct(id: string, tenantId: string): Promise<{
        supplier: {
            email: string | null;
            tenantId: string;
            id: string;
            phone: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
        } | null;
        stockMovements: {
            type: import(".prisma/client").$Enums.StockMovementType;
            branchId: string;
            id: string;
            createdAt: Date;
            notes: string | null;
            quantity: number;
            reference: string | null;
            productId: string;
        }[];
    } & {
        tenantId: string;
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        quantity: number;
        category: string;
        sku: string;
        unit: string;
        minStock: number;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellingPrice: import("@prisma/client/runtime/library").Decimal;
        supplierId: string | null;
        expiryDate: Date | null;
    }>;
    createProduct(tenantId: string, dto: CreateProductDto): Promise<{
        tenantId: string;
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        quantity: number;
        category: string;
        sku: string;
        unit: string;
        minStock: number;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellingPrice: import("@prisma/client/runtime/library").Decimal;
        supplierId: string | null;
        expiryDate: Date | null;
    }>;
    updateProduct(id: string, tenantId: string, dto: UpdateProductDto): Promise<{
        tenantId: string;
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        quantity: number;
        category: string;
        sku: string;
        unit: string;
        minStock: number;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellingPrice: import("@prisma/client/runtime/library").Decimal;
        supplierId: string | null;
        expiryDate: Date | null;
    }>;
    recordMovement(id: string, tenantId: string, dto: StockMovementDto): Promise<{
        type: import(".prisma/client").$Enums.StockMovementType;
        branchId: string;
        id: string;
        createdAt: Date;
        notes: string | null;
        quantity: number;
        reference: string | null;
        productId: string;
    }>;
    getMovements(id: string, tenantId: string): Promise<{
        type: import(".prisma/client").$Enums.StockMovementType;
        branchId: string;
        id: string;
        createdAt: Date;
        notes: string | null;
        quantity: number;
        reference: string | null;
        productId: string;
    }[]>;
    findTransfers(fromBranchId?: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        notes: string | null;
        quantity: number;
        fromBranchId: string;
        toBranchId: string;
        productSku: string;
        transferredAt: Date | null;
    }[]>;
    createTransfer(dto: InventoryTransferDto): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        notes: string | null;
        quantity: number;
        fromBranchId: string;
        toBranchId: string;
        productSku: string;
        transferredAt: Date | null;
    }>;
}
