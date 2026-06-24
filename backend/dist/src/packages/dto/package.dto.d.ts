export declare class CreateServicePackageDto {
    name: string;
    nameAr?: string;
    description?: string;
    totalSessions: number;
    price: number;
    validityDays?: number;
}
declare const UpdateServicePackageDto_base: import("@nestjs/common").Type<Partial<CreateServicePackageDto>>;
export declare class UpdateServicePackageDto extends UpdateServicePackageDto_base {
}
export declare class AssignPatientPackageDto {
    patientId: string;
    packageId: string;
    expirationDate?: string;
}
export declare class UseSessionDto {
    sessions?: number;
}
export declare class UpdatePatientPackageDto {
    isActive?: boolean;
    expirationDate?: string;
}
export {};
