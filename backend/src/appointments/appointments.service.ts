import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  UpdateAppointmentStatusDto,
  CreateReminderDto,
} from './dto/appointment.dto';
import { AppointmentStatus, ReminderStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    tenantId: string,
    branchId?: string,
    status?: AppointmentStatus,
    page = 1,
    limit = 20,
  ) {
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

  async findOne(id: string, tenantId: string) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id, tenantId },
      include: {
        patient: true,
        doctor: { select: { id: true, firstName: true, lastName: true } },
        branch: true,
        reminders: { orderBy: { scheduledAt: 'asc' } },
      },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async create(tenantId: string, dto: CreateAppointmentDto) {
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

  async update(id: string, tenantId: string, dto: UpdateAppointmentDto) {
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

  async updateStatus(id: string, tenantId: string, dto: UpdateAppointmentStatusDto) {
    await this.findOne(id, tenantId);
    return this.prisma.appointment.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async remove(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    await this.prisma.appointment.delete({ where: { id } });
    return { message: 'Appointment deleted' };
  }

  async getCalendar(
    tenantId: string,
    view: 'daily' | 'weekly' | 'monthly',
    date: string,
    branchId?: string,
  ) {
    const start = new Date(date);
    if (Number.isNaN(start.getTime())) {
      throw new BadRequestException('Invalid date');
    }

    let end: Date;
    if (view === 'daily') {
      end = new Date(start);
      end.setDate(end.getDate() + 1);
    } else if (view === 'weekly') {
      const day = start.getDay();
      start.setDate(start.getDate() - day);
      end = new Date(start);
      end.setDate(end.getDate() + 7);
    } else {
      start.setDate(1);
      end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
    }

    const appointments = await this.prisma.appointment.findMany({
      where: {
        tenantId,
        ...(branchId && { branchId }),
        scheduledAt: { gte: start, lt: end },
        status: { not: AppointmentStatus.CANCELLED },
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

  async createReminder(id: string, tenantId: string, dto: CreateReminderDto) {
    await this.findOne(id, tenantId);
    return this.prisma.appointmentReminder.create({
      data: {
        appointmentId: id,
        channel: dto.channel,
        scheduledAt: new Date(dto.scheduledAt),
      },
    });
  }

  async getPendingReminders(tenantId: string) {
    return this.prisma.appointmentReminder.findMany({
      where: {
        status: ReminderStatus.PENDING,
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
}
