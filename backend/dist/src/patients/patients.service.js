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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PatientsService = class PatientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, branchId, search, page = 1, limit = 20) {
        const where = {
            tenantId,
            ...(branchId && { branchId }),
            ...(search && {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search } },
                    { patientNumber: { contains: search } },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            this.prisma.patient.findMany({
                where,
                include: { medicalInfo: true, branch: { select: { name: true, nameAr: true } } },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.patient.count({ where }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async findOne(id, tenantId) {
        const patient = await this.prisma.patient.findFirst({
            where: { id, tenantId },
            include: {
                medicalInfo: true,
                documents: { orderBy: { createdAt: 'desc' } },
                timelineEvents: { orderBy: { createdAt: 'desc' }, take: 50 },
                patientPackages: { include: { package: true } },
                branch: true,
            },
        });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        return patient;
    }
    async create(tenantId, dto) {
        const count = await this.prisma.patient.count({ where: { tenantId } });
        const patientNumber = `P-${String(count + 1).padStart(6, '0')}`;
        const patient = await this.prisma.patient.create({
            data: {
                tenantId,
                branchId: dto.branchId,
                patientNumber,
                firstName: dto.firstName,
                lastName: dto.lastName,
                firstNameAr: dto.firstNameAr,
                lastNameAr: dto.lastNameAr,
                gender: dto.gender,
                birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
                nationalId: dto.nationalId,
                phone: dto.phone,
                whatsapp: dto.whatsapp,
                email: dto.email,
                address: dto.address,
                emergencyName: dto.emergencyName,
                emergencyPhone: dto.emergencyPhone,
                medicalInfo: dto.medicalInfo ? { create: dto.medicalInfo } : undefined,
            },
            include: { medicalInfo: true },
        });
        await this.prisma.patientTimelineEvent.create({
            data: {
                patientId: patient.id,
                type: client_1.TimelineEventType.NOTE,
                title: 'Patient registered',
                description: 'New patient profile created',
            },
        });
        return patient;
    }
    async update(id, tenantId, dto) {
        await this.findOne(id, tenantId);
        const { medicalInfo: _medicalInfo, birthDate, ...rest } = dto;
        return this.prisma.patient.update({
            where: { id },
            data: {
                ...rest,
                birthDate: birthDate ? new Date(birthDate) : undefined,
            },
            include: { medicalInfo: true },
        });
    }
    async updateMedicalInfo(id, tenantId, dto) {
        await this.findOne(id, tenantId);
        return this.prisma.patientMedicalInfo.upsert({
            where: { patientId: id },
            create: { patientId: id, ...dto },
            update: dto,
        });
    }
    async getTimeline(id, tenantId) {
        await this.findOne(id, tenantId);
        return this.prisma.patientTimelineEvent.findMany({
            where: { patientId: id },
            include: { createdBy: { select: { firstName: true, lastName: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map