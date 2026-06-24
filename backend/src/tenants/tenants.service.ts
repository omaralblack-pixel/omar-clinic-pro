import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTenantDto,
  UpdateTenantDto,
  CreateSubscriptionPlanDto,
  UpdateSubscriptionPlanDto,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from './dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

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

  async findOneTenant(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: {
        branches: true,
        subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' } },
        _count: { select: { users: true, patients: true } },
      },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async createTenant(dto: CreateTenantDto) {
    const existing = await this.prisma.tenant.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException('Slug already in use');

    return this.prisma.tenant.create({
      data: {
        name: dto.name,
        nameAr: dto.nameAr,
        slug: dto.slug,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        logo: dto.logo,
        settings: (dto.settings ?? {}) as Prisma.InputJsonValue,
      },
    });
  }

  async updateTenant(id: string, dto: UpdateTenantDto) {
    await this.findOneTenant(id);
    if (dto.slug) {
      const existing = await this.prisma.tenant.findFirst({
        where: { slug: dto.slug, NOT: { id } },
      });
      if (existing) throw new ConflictException('Slug already in use');
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
        settings: dto.settings as Prisma.InputJsonValue | undefined,
      },
    });
  }

  async findAllPlans(activeOnly = true) {
    return this.prisma.subscriptionPlan.findMany({
      where: activeOnly ? { isActive: true } : {},
      orderBy: { price: 'asc' },
    });
  }

  async createPlan(dto: CreateSubscriptionPlanDto) {
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

  async updatePlan(id: string, dto: UpdateSubscriptionPlanDto) {
    const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('Plan not found');
    return this.prisma.subscriptionPlan.update({ where: { id }, data: dto });
  }

  async createSubscription(dto: CreateSubscriptionDto) {
    await this.findOneTenant(dto.tenantId);
    const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id: dto.planId } });
    if (!plan) throw new NotFoundException('Plan not found');

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

  async updateSubscription(id: string, dto: UpdateSubscriptionDto) {
    const sub = await this.prisma.subscription.findUnique({ where: { id } });
    if (!sub) throw new NotFoundException('Subscription not found');

    return this.prisma.subscription.update({
      where: { id },
      data: {
        status: dto.status,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
      include: { plan: true },
    });
  }
}
