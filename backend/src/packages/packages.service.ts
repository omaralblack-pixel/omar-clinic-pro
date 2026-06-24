import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateServicePackageDto,
  UpdateServicePackageDto,
  AssignPatientPackageDto,
  UseSessionDto,
  UpdatePatientPackageDto,
} from './dto/package.dto';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async findAllPackages(tenantId: string, activeOnly = true) {
    return this.prisma.servicePackage.findMany({
      where: { tenantId, ...(activeOnly && { isActive: true }) },
      orderBy: { name: 'asc' },
    });
  }

  async findOnePackage(id: string, tenantId: string) {
    const pkg = await this.prisma.servicePackage.findFirst({
      where: { id, tenantId },
    });
    if (!pkg) throw new NotFoundException('Service package not found');
    return pkg;
  }

  async createPackage(tenantId: string, dto: CreateServicePackageDto) {
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

  async updatePackage(id: string, tenantId: string, dto: UpdateServicePackageDto) {
    await this.findOnePackage(id, tenantId);
    return this.prisma.servicePackage.update({ where: { id }, data: dto });
  }

  async removePackage(id: string, tenantId: string) {
    await this.findOnePackage(id, tenantId);
    return this.prisma.servicePackage.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async findPatientPackages(tenantId: string, patientId?: string) {
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

  async findOnePatientPackage(id: string, tenantId: string) {
    const record = await this.prisma.patientPackage.findFirst({
      where: { id, patient: { tenantId } },
      include: { package: true, patient: true },
    });
    if (!record) throw new NotFoundException('Patient package not found');
    return record;
  }

  async assignPackage(tenantId: string, dto: AssignPatientPackageDto) {
    const pkg = await this.findOnePackage(dto.packageId, tenantId);
    const patient = await this.prisma.patient.findFirst({
      where: { id: dto.patientId, tenantId },
    });
    if (!patient) throw new NotFoundException('Patient not found');

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

  async useSession(id: string, tenantId: string, dto: UseSessionDto) {
    const record = await this.findOnePatientPackage(id, tenantId);
    const count = dto.sessions ?? 1;

    if (record.remainingSessions < count) {
      throw new BadRequestException('Insufficient remaining sessions');
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

  async updatePatientPackage(id: string, tenantId: string, dto: UpdatePatientPackageDto) {
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
}
