"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TenantsService = class TenantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllTenants(page = 1, limit = 20) {
        const [data, total] = await Promise.all([
            this.prisma.tenant.findMany({
                include: {
                    subscriptions: {
                        include: { plan: true },
                        orderBy: { createdAt: 'desc' },
                        take: 1,
                    },
                    _count: { select: { branches: true, users: true, patients: true } },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.tenant.count(),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async findOneTenant(id) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id },
            include: {
                branches: true,
                subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' } },
                _count: { select: { users: true, patients: true } },
            },
        });
        if (!tenant)
            throw new common_1.NotFoundException('Tenant not found');
        return tenant;
    }
    async createTenant(dto) {
        const existing = await this.prisma.tenant.findUnique({ where: { slug: dto.slug } });
        if (existing)
            throw new common_1.ConflictException('Slug already in use');
        return this.prisma.tenant.create({
            data: {
                name: dto.name,
                nameAr: dto.nameAr,
                slug: dto.slug,
                email: dto.email,
                phone: dto.phone,
                address: dto.address,
                logo: dto.logo,
                settings: (dto.settings ?? {}),
            },
        });
    }
    async updateTenant(id, dto) {
        await this.findOneTenant(id);
        if (dto.slug) {
            const existing = await this.prisma.tenant.findFirst({
                where: { slug: dto.slug, NOT: { id } },
            });
            if (existing)
                throw new common_1.ConflictException('Slug already in use');
        }
        return this.prisma.tenant.update({
            where: { id },
            data: {
                name: dto.name,
                nameAr: dto.nameAr,
                slug: dto.slug,
                email: dto.email,
                phone: dto.phone,
                address: dto.address,
                logo: dto.logo,
                isActive: dto.isActive,
                settings: dto.settings,
            },
        });
    }
    async findAllPlans(activeOnly = true) {
        return this.prisma.subscriptionPlan.findMany({
            where: activeOnly ? { isActive: true } : {},
            orderBy: { price: 'asc' },
        });
    }
    async createPlan(dto) {
        return this.prisma.subscriptionPlan.create({
            data: {
                name: dto.name,
                nameAr: dto.nameAr,
                description: dto.description,
                price: dto.price,
                currency: dto.currency ?? 'JOD',
                maxBranches: dto.maxBranches ?? 1,
                maxUsers: dto.maxUsers ?? 5,
                features: dto.features ?? [],
            },
        });
    }
    async updatePlan(id, dto) {
        const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id } });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        return this.prisma.subscriptionPlan.update({ where: { id }, data: dto });
    }
    async createSubscription(dto) {
        await this.findOneTenant(dto.tenantId);
        const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id: dto.planId } });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        return this.prisma.subscription.create({
            data: {
                tenantId: dto.tenantId,
                planId: dto.planId,
                status: dto.status,
                startDate: new Date(dto.startDate),
                endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            },
            include: { plan: true, tenant: { select: { name: true } } },
        });
    }
    async updateSubscription(id, dto) {
        const sub = await this.prisma.subscription.findUnique({ where: { id } });
        if (!sub)
            throw new common_1.NotFoundException('Subscription not found');
        return this.prisma.subscription.update({
            where: { id },
            data: {
                status: dto.status,
                endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            },
            include: { plan: true },
        });
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map