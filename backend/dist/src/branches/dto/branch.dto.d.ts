export declare class CreateBranchDto {
    name: string;
    nameAr?: string;
    code: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    settings?: Record<string, unknown>;
}
declare const UpdateBranchDto_base: import("@nestjs/common").Type<Partial<CreateBranchDto>>;
export declare class UpdateBranchDto extends UpdateBranchDto_base {
    isActive?: boolean;
}
export {};
