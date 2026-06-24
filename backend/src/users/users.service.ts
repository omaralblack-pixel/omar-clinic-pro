import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, AssignPermissionsDto } from './dto/user.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string | null, branchId?: string, page = 1, limit = 20) {
    const where = {
      ...(tenantId && { tenantId }),
      ...(branchId && { branchId }),
    };

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: this.userSelect(),
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: string, tenantId?: string | null) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        ...(tenantId && { tenantId }),
      },
      select: {
        ...this.userSelect(),
        userPermissions: {
          include: { permission: { select: { code: true, name: true, module: true } } },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(dto: CreateUserDto, actorRole: UserRole, actorTenantId?: string) {
    if (dto.role === UserRole.SUPER_ADMIN && actorRole !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('Cannot create super admin users');
    }

    const tenantId =
      actorRole === UserRole.SUPER_ADMIN ? dto.tenantId : actorTenantId ?? dto.tenantId;

    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    return this.prisma.user.create({
      data: {
        tenantId,
        branchId: dto.branchId,
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        firstNameAr: dto.firstNameAr,
        lastNameAr: dto.lastNameAr,
        phone: dto.phone,
        role: dto.role,
      },
      select: this.userSelect(),
    });
  }

  async update(
    id: string,
    dto: UpdateUserDto,
    tenantId?: string | null,
    actorRole?: UserRole,
  ) {
    const user = await this.findOne(id, tenantId);

    if (dto.role === UserRole.SUPER_ADMIN && actorRole !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('Cannot assign super admin role');
    }

    const data: Record<string, unknown> = { ...dto };
    if (dto.email) data.email = dto.email.toLowerCase();
    if (dto.password) data.passwordHash = await bcrypt.hash(dto.password, 12);
    delete data.password;

    return this.prisma.user.update({
      where: { id: user.id },
      data,
      select: this.userSelect(),
    });
  }

  async assignPermissions(id: string, dto: AssignPermissionsDto, tenantId?: string | null) {
    await this.findOne(id, tenantId);

    const permissions = await this.prisma.permission.findMany({
      where: { code: { in: dto.permissionCodes } },
    });

    await this.prisma.userPermission.deleteMany({ where: { userId: id } });

    if (permissions.length) {
      await this.prisma.userPermission.createMany({
        data: permissions.map((p: { id: string }) => ({
          userId: id,
          permissionId: p.id,
          granted: true,
        })),
      });
    }

    return this.findOne(id, tenantId);
  }

  async deactivate(id: string, tenantId?: string | null) {
    await this.findOne(id, tenantId);
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: this.userSelect(),
    });
  }

  private userSelect() {
    return {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      firstNameAr: true,
      lastNameAr: true,
      phone: true,
      avatar: true,
      role: true,
      tenantId: true,
      branchId: true,
      isActive: true,
      emailVerified: true,
      twoFactorEnabled: true,
      lastLoginAt: true,
      createdAt: true,
      updatedAt: true,
    };
  }
}
