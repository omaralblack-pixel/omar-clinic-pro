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
exports.PackagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PackagesService = class PackagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllPackages(tenantId, activeOnly = true) {
        return this.prisma.servicePackage.findMany({
            where: { tenantId, ...(activeOnly && { isActive: true }) },
            orderBy: { name: 'asc' },
        });
    }
    async findOnePackage(id, tenantId) {
        const pkg = await this.prisma.servicePackage.findFirst({
            where: { id, tenantId },
        });
        if (!pkg)
            throw new common_1.NotFoundException('Service package not found');
        return pkg;
    }
    async createPackage(tenantId, dto) {
        return this.prisma.servicePackage.create({
            data: {
                tenantId,
                name: dto.name,
                nameAr: dto.nameAr,
                description: dto.description,
                totalSessions: dto.totalSessions,
                price: dto.price,
                validityDays: dto.validityDays ?? 365,
            },
        });
    }
    async updatePackage(id, tenantId, dto) {
        await this.findOnePackage(id, tenantId);
        return this.prisma.servicePackage.update({ where: { id }, data: dto });
    }
    async removePackage(id, tenantId) {
        await this.findOnePackage(id, tenantId);
        return this.prisma.servicePackage.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async findPatientPackages(tenantId, patientId) {
        return this.prisma.patientPackage.findMany({
            where: {
                ...(patientId && { patientId }),
                patient: { tenantId },
            },
            include: {
                package: true,
                patient: {
                    select: { id: true, firstName: true, lastName: true, patientNumber: true },
                },
            },
            orderBy: { purchaseDate: 'desc' },
        });
    }
    async findOnePatientPackage(id, tenantId) {
        const record = await this.prisma.patientPackage.findFirst({
            where: { id, patient: { tenantId } },
            include: { package: true, patient: true },
        });
        if (!record)
            throw new common_1.NotFoundException('Patient package not found');
        return record;
    }
    async assignPackage(tenantId, dto) {
        const pkg = await this.findOnePackage(dto.packageId, tenantId);
        const patient = await this.prisma.patient.findFirst({
            where: { id: dto.patientId, tenantId },
        });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const expirationDate = dto.expirationDate
            ? new Date(dto.expirationDate)
            : new Date(Date.now() + pkg.validityDays * 24 * 60 * 60 * 1000);
        return this.prisma.patientPackage.create({
            data: {
                patientId: dto.patientId,
                packageId: dto.packageId,
                totalSessions: pkg.totalSessions,
                usedSessions: 0,
                remainingSessions: pkg.totalSessions,
                expirationDate,
            },
            include: { package: true, patient: true },
        });
    }
    async useSession(id, tenantId, dto) {
        const record = await this.findOnePatientPackage(id, tenantId);
        const count = dto.sessions ?? 1;
        if (record.remainingSessions < count) {
            throw new common_1.BadRequestException('Insufficient remaining sessions');
        }
        return this.prisma.patientPackage.update({
            where: { id },
            data: {
                usedSessions: record.usedSessions + count,
                remainingSessions: record.remainingSessions - count,
            },
            include: { package: true },
        });
    }
    async updatePatientPackage(id, tenantId, dto) {
        await this.findOnePatientPackage(id, tenantId);
        return this.prisma.patientPackage.update({
            where: { id },
            data: {
                isActive: dto.isActive,
                expirationDate: dto.expirationDate ? new Date(dto.expirationDate) : undefined,
            },
            include: { package: true },
        });
    }
};
exports.PackagesService = PackagesService;
exports.PackagesService = PackagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PackagesService);
//# sourceMappingURL=packages.service.js.map