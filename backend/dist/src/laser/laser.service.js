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
exports.LaserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LaserService = class LaserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllAreas(tenantId) {
        return this.prisma.laserArea.findMany({
            where: { tenantId },
            orderBy: { name: 'asc' },
        });
    }
    async findOneArea(id, tenantId) {
        const area = await this.prisma.laserArea.findFirst({
            where: { id, tenantId },
        });
        if (!area)
            throw new common_1.NotFoundException('Laser area not found');
        return area;
    }
    async createArea(tenantId, dto) {
        return this.prisma.laserArea.create({
            data: { tenantId, ...dto },
        });
    }
    async updateArea(id, tenantId, dto) {
        await this.findOneArea(id, tenantId);
        return this.prisma.laserArea.update({ where: { id }, data: dto });
    }
    async removeArea(id, tenantId) {
        await this.findOneArea(id, tenantId);
        await this.prisma.laserArea.update({
            where: { id },
            data: { isActive: false },
        });
        return { message: 'Laser area deactivated' };
    }
    async findAllSessions(tenantId, branchId, patientId, page = 1, limit = 20) {
        const where = {
            tenantId,
            ...(branchId && { branchId }),
            ...(patientId && { patientId }),
        };
        const [data, total] = await Promise.all([
            this.prisma.laserSession.findMany({
                where,
                include: {
                    patient: { select: { firstName: true, lastName: true, patientNumber: true } },
                    area: true,
                    specialist: { select: { firstName: true, lastName: true } },
                    photos: true,
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { sessionDate: 'desc' },
            }),
            this.prisma.laserSession.count({ where }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async findOneSession(id, tenantId) {
        const session = await this.prisma.laserSession.findFirst({
            where: { id, tenantId },
            include: {
                patient: true,
                area: true,
                specialist: { select: { id: true, firstName: true, lastName: true } },
                photos: { orderBy: { createdAt: 'desc' } },
                branch: { select: { name: true } },
            },
        });
        if (!session)
            throw new common_1.NotFoundException('Laser session not found');
        return session;
    }
    async createSession(tenantId, dto) {
        return this.prisma.laserSession.create({
            data: {
                tenantId,
                branchId: dto.branchId,
                patientId: dto.patientId,
                areaId: dto.areaId,
                specialistId: dto.specialistId,
                sessionNumber: dto.sessionNumber,
                sessionDate: new Date(dto.sessionDate),
                device: dto.device,
                energyLevel: dto.energyLevel,
                pulseWidth: dto.pulseWidth,
                notes: dto.notes,
            },
            include: { area: true, patient: true },
        });
    }
    async updateSession(id, tenantId, dto) {
        await this.findOneSession(id, tenantId);
        return this.prisma.laserSession.update({
            where: { id },
            data: {
                ...dto,
                sessionDate: dto.sessionDate ? new Date(dto.sessionDate) : undefined,
            },
            include: { area: true, photos: true },
        });
    }
    async removeSession(id, tenantId) {
        await this.findOneSession(id, tenantId);
        await this.prisma.laserSession.delete({ where: { id } });
        return { message: 'Laser session deleted' };
    }
    async addSessionPhoto(id, tenantId, dto) {
        await this.findOneSession(id, tenantId);
        return this.prisma.laserSessionPhoto.create({
            data: { sessionId: id, ...dto },
        });
    }
    async removeSessionPhoto(sessionId, photoId, tenantId) {
        await this.findOneSession(sessionId, tenantId);
        await this.prisma.laserSessionPhoto.delete({ where: { id: photoId } });
        return { message: 'Photo removed' };
    }
};
exports.LaserService = LaserService;
exports.LaserService = LaserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LaserService);
//# sourceMappingURL=laser.service.js.map