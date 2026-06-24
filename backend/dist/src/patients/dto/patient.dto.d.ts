import { Gender, SkinType, PregnancyStatus } from '@prisma/client';
export declare class MedicalInfoDto {
    allergies?: string;
    diseases?: string;
    medications?: string;
    pregnancyStatus?: PregnancyStatus;
    skinType?: SkinType;
    medicalNotes?: string;
}
export declare class CreatePatientDto {
    branchId: string;
    firstName: string;
    lastName: string;
    firstNameAr?: string;
    lastNameAr?: string;
    gender: Gender;
    birthDate?: string;
    nationalId?: string;
    phone: string;
    whatsapp?: string;
    email?: string;
    address?: string;
    emergencyName?: string;
    emergencyPhone?: string;
    medicalInfo?: MedicalInfoDto;
}
declare const UpdatePatientDto_base: import("@nestjs/common").Type<Partial<CreatePatientDto>>;
export declare class UpdatePatientDto extends UpdatePatientDto_base {
}
export declare class UpdateMedicalInfoDto extends MedicalInfoDto {
}
export {};
