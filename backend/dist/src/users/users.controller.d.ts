import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, AssignPermissionsDto } from './dto/user.dto';
import { UserRole } from '@prisma/client';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(tenantId: string, role: UserRole, branchId?: string, page?: number, limit?: number): Promise<{
        data: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            tenantId: string | null;
            branchId: string | null;
            id: string;
            firstName: string;
            lastName: string;
            firstNameAr: string | null;
            lastNameAr: string | null;
            phone: string | null;
            avatar: string | null;
            isActive: boolean;
            emailVerified: boolean;
            twoFactorEnabled: boolean;
            lastLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, tenantId: string, role: UserRole): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        tenantId: string | null;
        branchId: string | null;
        id: string;
        firstName: string;
        lastName: string;
        firstNameAr: string | null;
        lastNameAr: string | null;
        phone: string | null;
        avatar: string | null;
        isActive: boolean;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userPermissions: ({
            permission: {
                name: string;
                code: string;
                module: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            permissionId: string;
            granted: boolean;
        })[];
    }>;
    create(dto: CreateUserDto, role: UserRole, tenantId: string): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        tenantId: string | null;
        branchId: string | null;
        id: string;
        firstName: string;
        lastName: string;
        firstNameAr: string | null;
        lastNameAr: string | null;
        phone: string | null;
        avatar: string | null;
        isActive: boolean;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto, tenantId: string, role: UserRole): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        tenantId: string | null;
        branchId: string | null;
        id: string;
        firstName: string;
        lastName: string;
        firstNameAr: string | null;
        lastNameAr: string | null;
        phone: string | null;
        avatar: string | null;
        isActive: boolean;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    assignPermissions(id: string, dto: AssignPermissionsDto, tenantId: string, role: UserRole): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        tenantId: string | null;
        branchId: string | null;
        id: string;
        firstName: string;
        lastName: string;
        firstNameAr: string | null;
        lastNameAr: string | null;
        phone: string | null;
        avatar: string | null;
        isActive: boolean;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userPermissions: ({
            permission: {
                name: string;
                code: string;
                module: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            permissionId: string;
            granted: boolean;
        })[];
    }>;
    deactivate(id: string, tenantId: string, role: UserRole): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        tenantId: string | null;
        branchId: string | null;
        id: string;
        firstName: string;
        lastName: string;
        firstNameAr: string | null;
        lastNameAr: string | null;
        phone: string | null;
        avatar: string | null;
        isActive: boolean;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
