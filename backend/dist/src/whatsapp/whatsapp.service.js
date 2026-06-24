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
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let WhatsappService = class WhatsappService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async sendMessage(tenantId, dto) {
        const record = await this.prisma.whatsAppMessage.create({
            data: {
                tenantId,
                phone: dto.phone,
                message: dto.message,
                type: dto.type ?? client_1.WhatsAppMessageType.CUSTOM,
                status: client_1.ReminderStatus.PENDING,
            },
        });
        try {
            await this.dispatchWhatsApp(dto.phone, dto.message);
            return this.prisma.whatsAppMessage.update({
                where: { id: record.id },
                data: { status: client_1.ReminderStatus.SENT, sentAt: new Date() },
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Send failed';
            return this.prisma.whatsAppMessage.update({
                where: { id: record.id },
                data: { status: client_1.ReminderStatus.FAILED, metadata: { error: errorMessage } },
            });
        }
    }
    async sendAppointmentReminder(tenantId, dto) {
        const appointment = await this.prisma.appointment.findFirst({
            where: { id: dto.appointmentId, tenantId },
            include: { patient: true },
        });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        const phone = appointment.patient.whatsapp ?? appointment.patient.phone;
        const defaultMessage = `Reminder: You have an appointment "${appointment.title}" on ` +
            `${appointment.scheduledAt.toLocaleString('en-JO')}. Omar Clinic`;
        return this.sendMessage(tenantId, {
            phone,
            message: dto.customMessage ?? defaultMessage,
            type: client_1.WhatsAppMessageType.APPOINTMENT_REMINDER,
        });
    }
    async getMessageHistory(tenantId, page = 1, limit = 20) {
        const where = { tenantId };
        const [data, total] = await Promise.all([
            this.prisma.whatsAppMessage.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.whatsAppMessage.count({ where }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async dispatchWhatsApp(phone, message) {
        const apiUrl = this.config.get('WHATSAPP_API_URL');
        const apiKey = this.config.get('WHATSAPP_API_KEY');
        if (!apiUrl || !apiKey) {
            console.log(`[WhatsApp Mock] To: ${phone} | Message: ${message}`);
            return;
        }
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ phone, message }),
        });
        if (!response.ok) {
            throw new Error(`WhatsApp API error: ${response.statusText}`);
        }
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map