import { DocumentType, LaserAreaPreset } from '@prisma/client';
export declare class CreateLaserAreaDto {
    name: string;
    nameAr?: string;
    preset?: LaserAreaPreset;
}
declare const UpdateLaserAreaDto_base: import("@nestjs/common").Type<Partial<CreateLaserAreaDto>>;
export declare class UpdateLaserAreaDto extends UpdateLaserAreaDto_base {
}
export declare class CreateLaserSessionDto {
    branchId: string;
    patientId: string;
    areaId: string;
    specialistId?: string;
    sessionNumber: number;
    sessionDate: string;
    device?: string;
    energyLevel?: string;
    pulseWidth?: string;
    notes?: string;
}
declare const UpdateLaserSessionDto_base: import("@nestjs/common").Type<Partial<CreateLaserSessionDto>>;
export declare class UpdateLaserSessionDto extends UpdateLaserSessionDto_base {
}
export declare class AddSessionPhotoDto {
    type: DocumentType;
    fileUrl: string;
    fileName: string;
    notes?: string;
}
export {};
