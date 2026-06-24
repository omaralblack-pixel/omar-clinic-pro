import { SubscriptionStatus } from '@prisma/client';
export declare class CreateTenantDto {
    name: string;
    nameAr?: string;
    slug: string;
    email: string;
    phone?: string;
    address?: string;
    logo?: string;
    settings?: Record<string, unknown>;
}
declare const UpdateTenantDto_base: import("@nestjs/common").Type<Partial<CreateTenantDto>>;
export declare class UpdateTenantDto extends UpdateTenantDto_base {
    isActive?: boolean;
}
export declare class CreateSubscriptionPlanDto {
    name: string;
    nameAr?: string;
    description?: string;
    price: number;
    currency?: string;
    maxBranches?: number;
    maxUsers?: number;
    features?: string[];
}
declare const UpdateSubscriptionPlanDto_base: import("@nestjs/common").Type<Partial<CreateSubscriptionPlanDto>>;
export declare class UpdateSubscriptionPlanDto extends UpdateSubscriptionPlanDto_base {
    isActive?: boolean;
}
export declare class CreateSubscriptionDto {
    tenantId: string;
    planId: string;
    status?: SubscriptionStatus;
    startDate: string;
    endDate?: string;
}
export declare class UpdateSubscriptionDto {
    status?: SubscriptionStatus;
    endDate?: string;
}
export {};
