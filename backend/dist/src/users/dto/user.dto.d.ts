import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    tenantId?: string;
    branchId?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    firstNameAr?: string;
    lastNameAr?: string;
    phone?: string;
    role: UserRole;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "password">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    isActive?: boolean;
    password?: string;
}
export declare class AssignPermissionsDto {
    permissionCodes: string[];
}
export {};
