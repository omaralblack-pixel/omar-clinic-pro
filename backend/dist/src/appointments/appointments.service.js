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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AppointmentsService = class AppointmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, branchId, status, page = 1, limit = 20) {
        const where = {
            tenantId,
            ...(branchId && { branchId }),
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.appointment.findMany({
                where,
                include: {
                    patient: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            phone: true,
                            patientNumber: true,
                        },
                    },
                    doctor: { select: { id: true, firstName: true, lastName: true } },
                    branch: { select: { name: true, nameAr: true } },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { scheduledAt: 'asc' },
            }),
            this.prisma.appointment.count({ where }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async findOne(id, tenantId) {
        const appointment = await this.prisma.appointment.findFirst({
            where: { id, tenantId },
            include: {
                patient: true,
                doctor: { select: { id: true, firstName: true, lastName: true } },
                branch: true,
                reminders: { orderBy: { scheduledAt: 'asc' } },
            },
        });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        return appointment;
    }
    async create(tenantId, dto) {
        return this.prisma.appointment.create({
            data: {
                tenantId,
                branchId: dto.branchId,
                patientId: dto.patientId,
                doctorId: dto.doctorId,
                title: dto.title,
                description: dto.description,
                scheduledAt: new Date(dto.scheduledAt),
                duration: dto.duration ?? 30,
                notes: dto.notes,
            },
            include: {
                patient: { select: { firstName: true, lastName: true, phone: true } },
                doctor: { select: { firstName: true, lastName: true } },
            },
        });
    }
    async update(id, tenantId, dto) {
        await this.findOne(id, tenantId);
        return this.prisma.appointment.update({
            where: { id },
            data: {
                ...dto,
                scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
            },
            include: { patient: true, doctor: true },
        });
    }
    async updateStatus(id, tenantId, dto) {
        await this.findOne(id, tenantId);
        return this.prisma.appointment.update({
            where: { id },
            data: { status: dto.status },
        });
    }
    async remove(id, tenantId) {
        await this.findOne(id, tenantId);
        await this.prisma.appointment.delete({ where: { id } });
        return { message: 'Appointment deleted' };
    }
    async getCalendar(tenantId, view, date, branchId) {
        const start = new Date(date);
        if (Number.isNaN(start.getTime())) {
            throw new common_1.BadRequestException('Invalid date');
        }
        let end;
        if (view === 'daily') {
            end = new Date(start);
            end.setDate(end.getDate() + 1);
        }
        else if (view === 'weekly') {
            const day = start.getDay();
            start.setDate(start.getDate() - day);
            end = new Date(start);
            end.setDate(end.getDate() + 7);
        }
        else {
            start.setDate(1);
            end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
        }
        const appointments = await this.prisma.appointment.findMany({
            where: {
                tenantId,
                ...(branchId && { branchId }),
                scheduledAt: { gte: start, lt: end },
                status: { not: client_1.AppointmentStatus.CANCELLED },
            },
            include: {
                patient: {
                    select: { id: true, firstName: true, lastName: true, phone: true },
                },
                doctor: { select: { id: true, firstName: true, lastName: true } },
            },
            orderBy: { scheduledAt: 'asc' },
        });
        return { view, start, end, appointments };
    }
    async createReminder(id, tenantId, dto) {
        await this.findOne(id, tenantId);
        return this.prisma.appointmentReminder.create({
            data: {
                appointmentId: id,
                channel: dto.channel,
                scheduledAt: new Date(dto.scheduledAt),
            },
        });
    }
    async getPendingReminders(tenantId) {
        return this.prisma.appointmentReminder.findMany({
            where: {
                status: client_1.ReminderStatus.PENDING,
                scheduledAt: { lte: new Date() },
                appointment: { tenantId },
            },
            include: {
                appointment: {
                    include: {
                        patient: { select: { firstName: true, lastName: true, phone: true, whatsapp: true } },
                    },
                },
            },
            orderBy: { scheduledAt: 'asc' },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map