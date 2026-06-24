import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SendMessageDto, SendAppointmentReminderDto } from './dto/whatsapp.dto';
import { ReminderStatus, WhatsAppMessageType } from '@prisma/client';

@Injectable()
export class WhatsappService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async sendMessage(tenantId: string, dto: SendMessageDto) {
    const record = await this.prisma.whatsAppMessage.create({
      data: {
        tenantId,
        phone: dto.phone,
        message: dto.message,
        type: dto.type ?? WhatsAppMessageType.CUSTOM,
        status: ReminderStatus.PENDING,
      },
    });

    try {
      await this.dispatchWhatsApp(dto.phone, dto.message);
      return this.prisma.whatsAppMessage.update({
        where: { id: record.id },
        data: { status: ReminderStatus.SENT, sentAt: new Date() },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Send failed';
      return this.prisma.whatsAppMessage.update({
        where: { id: record.id },
        data: { status: ReminderStatus.FAILED, metadata: { error: errorMessage } },
      });
    }
  }

  async sendAppointmentReminder(tenantId: string, dto: SendAppointmentReminderDto) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id: dto.appointmentId, tenantId },
      include: { patient: true },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');

    const phone = appointment.patient.whatsapp ?? appointment.patient.phone;
    const defaultMessage =
      `Reminder: You have an appointment "${appointment.title}" on ` +
      `${appointment.scheduledAt.toLocaleString('en-JO')}. Omar Clinic`;

    return this.sendMessage(tenantId, {
      phone,
      message: dto.customMessage ?? defaultMessage,
      type: WhatsAppMessageType.APPOINTMENT_REMINDER,
    });
  }

  async getMessageHistory(tenantId: string, page = 1, limit = 20) {
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

  private async dispatchWhatsApp(phone: string, message: string): Promise<void> {
    const apiUrl = this.config.get<string>('WHATSAPP_API_URL');
    const apiKey = this.config.get<string>('WHATSAPP_API_KEY');

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
}
