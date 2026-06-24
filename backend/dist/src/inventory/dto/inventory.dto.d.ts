import { StockMovementType } from '@prisma/client';
export declare class CreateSupplierDto {
    name: string;
    phone?: string;
    email?: string;
    address?: string;
}
declare const UpdateSupplierDto_base: import("@nestjs/common").Type<Partial<CreateSupplierDto>>;
export declare class UpdateSupplierDto extends UpdateSupplierDto_base {
}
export declare class CreateProductDto {
    branchId: string;
    sku: string;
    name: string;
    nameAr?: string;
    category: string;
    unit?: string;
    quantity?: number;
    minStock?: number;
    costPrice: number;
    sellingPrice: number;
    supplierId?: string;
    expiryDate?: string;
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export declare class StockMovementDto {
    type: StockMovementType;
    quantity: number;
    notes?: string;
    reference?: string;
}
export declare class InventoryTransferDto {
    fromBranchId: string;
    toBranchId: string;
    productSku: string;
    quantity: number;
    notes?: string;
}
export {};
