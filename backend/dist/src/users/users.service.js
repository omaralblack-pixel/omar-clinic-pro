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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, branchId, page = 1, limit = 20) {
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
    async findOne(id, tenantId) {
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
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async create(dto, actorRole, actorTenantId) {
        if (dto.role === client_1.UserRole.SUPER_ADMIN && actorRole !== client_1.UserRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('Cannot create super admin users');
        }
        const tenantId = actorRole === client_1.UserRole.SUPER_ADMIN ? dto.tenantId : actorTenantId ?? dto.tenantId;
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase() },
        });
        if (existing)
            throw new common_1.ConflictException('Email already registered');
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
    async update(id, dto, tenantId, actorRole) {
        const user = await this.findOne(id, tenantId);
        if (dto.role === client_1.UserRole.SUPER_ADMIN && actorRole !== client_1.UserRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('Cannot assign super admin role');
        }
        const data = { ...dto };
        if (dto.email)
            data.email = dto.email.toLowerCase();
        if (dto.password)
            data.passwordHash = await bcrypt.hash(dto.password, 12);
        delete data.password;
        return this.prisma.user.update({
            where: { id: user.id },
            data,
            select: this.userSelect(),
        });
    }
    async assignPermissions(id, dto, tenantId) {
        await this.findOne(id, tenantId);
        const permissions = await this.prisma.permission.findMany({
            where: { code: { in: dto.permissionCodes } },
        });
        await this.prisma.userPermission.deleteMany({ where: { userId: id } });
        if (permissions.length) {
            await this.prisma.userPermission.createMany({
                data: permissions.map((p) => ({
                    userId: id,
                    permissionId: p.id,
                    granted: true,
                })),
            });
        }
        return this.findOne(id, tenantId);
    }
    async deactivate(id, tenantId) {
        await this.findOne(id, tenantId);
        return this.prisma.user.update({
            where: { id },
            data: { isActive: false },
            select: this.userSelect(),
        });
    }
    userSelect() {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map