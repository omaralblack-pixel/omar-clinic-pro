import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto, UpdateMedicalInfoDto } from './dto/patient.dto';
import { TimelineEventType } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string, branchId?: string, search?: string, page = 1, limit = 20) {
    const where = {
      tenantId,
      ...(branchId && { branchId }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' as const } },
          { lastName: { contains: search, mode: 'insensitive' as const } },
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

  async findOne(id: string, tenantId: string) {
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
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async create(tenantId: string, dto: CreatePatientDto) {
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
        type: TimelineEventType.NOTE,
        title: 'Patient registered',
        description: 'New patient profile created',
      },
    });

    return patient;
  }

  async update(id: string, tenantId: string, dto: UpdatePatientDto) {
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

  async updateMedicalInfo(id: string, tenantId: string, dto: UpdateMedicalInfoDto) {
    await this.findOne(id, tenantId);
    return this.prisma.patientMedicalInfo.upsert({
      where: { patientId: id },
      create: { patientId: id, ...dto },
      update: dto,
    });
  }

  async getTimeline(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.patientTimelineEvent.findMany({
      where: { patientId: id },
      include: { createdBy: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
