import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, AssignPermissionsDto } from './dto/user.dto';
import { UserRole } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string | null, branchId?: string, page?: number, limit?: number): Promise<{
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
    findOne(id: string, tenantId?: string | null): Promise<{
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
    create(dto: CreateUserDto, actorRole: UserRole, actorTenantId?: string): Promise<{
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
    update(id: string, dto: UpdateUserDto, tenantId?: string | null, actorRole?: UserRole): Promise<{
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
    assignPermissions(id: string, dto: AssignPermissionsDto, tenantId?: string | null): Promise<{
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
    deactivate(id: string, tenantId?: string | null): Promise<{
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
    private userSelect;
}
