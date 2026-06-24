import { TenantsService } from './tenants.service';
import { CreateTenantDto, UpdateTenantDto, CreateSubscriptionPlanDto, UpdateSubscriptionPlanDto, CreateSubscriptionDto, UpdateSubscriptionDto } from './dto/tenant.dto';
export declare class TenantsController {
    private tenantsService;
    constructor(tenantsService: TenantsService);
    findAllPlans(activeOnly?: boolean): Promise<{
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        maxBranches: number;
        maxUsers: number;
        features: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    createPlan(dto: CreateSubscriptionPlanDto): Promise<{
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        maxBranches: number;
        maxUsers: number;
        features: import("@prisma/client/runtime/library").JsonValue;
    }>;
    updatePlan(planId: string, dto: UpdateSubscriptionPlanDto): Promise<{
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        maxBranches: number;
        maxUsers: number;
        features: import("@prisma/client/runtime/library").JsonValue;
    }>;
    createSubscription(dto: CreateSubscriptionDto): Promise<{
        tenant: {
            name: string;
        };
        plan: {
            description: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            maxBranches: number;
            maxUsers: number;
            features: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        planId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date | null;
    }>;
    updateSubscription(id: string, dto: UpdateSubscriptionDto): Promise<{
        plan: {
            description: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            maxBranches: number;
            maxUsers: number;
            features: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        planId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date | null;
    }>;
    findAllTenants(page?: number, limit?: number): Promise<{
        data: ({
            subscriptions: ({
                plan: {
                    description: string | null;
                    id: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    nameAr: string | null;
                    price: import("@prisma/client/runtime/library").Decimal;
                    currency: string;
                    maxBranches: number;
                    maxUsers: number;
                    features: import("@prisma/client/runtime/library").JsonValue;
                };
            } & {
                tenantId: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                planId: string;
                status: import(".prisma/client").$Enums.SubscriptionStatus;
                startDate: Date;
                endDate: Date | null;
            })[];
            _count: {
                branches: number;
                users: number;
                patients: number;
            };
        } & {
            email: string;
            id: string;
            phone: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            slug: string;
            logo: string | null;
            address: string | null;
            settings: import("@prisma/client/runtime/library").JsonValue;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOneTenant(id: string): Promise<{
        branches: {
            email: string | null;
            tenantId: string;
            id: string;
            phone: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            address: string | null;
            settings: import("@prisma/client/runtime/library").JsonValue;
            code: string;
            city: string | null;
        }[];
        subscriptions: ({
            plan: {
                description: string | null;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                nameAr: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                currency: string;
                maxBranches: number;
                maxUsers: number;
                features: import("@prisma/client/runtime/library").JsonValue;
            };
        } & {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            planId: string;
            status: import(".prisma/client").$Enums.SubscriptionStatus;
            startDate: Date;
            endDate: Date | null;
        })[];
        _count: {
            users: number;
            patients: number;
        };
    } & {
        email: string;
        id: string;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        slug: string;
        logo: string | null;
        address: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
    }>;
    createTenant(dto: CreateTenantDto): Promise<{
        email: string;
        id: string;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        slug: string;
        logo: string | null;
        address: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
    }>;
    updateTenant(id: string, dto: UpdateTenantDto): Promise<{
        email: string;
        id: string;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        slug: string;
        logo: string | null;
        address: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
