import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateLaserAreaDto,
  UpdateLaserAreaDto,
  CreateLaserSessionDto,
  UpdateLaserSessionDto,
  AddSessionPhotoDto,
} from './dto/laser.dto';

@Injectable()
export class LaserService {
  constructor(private prisma: PrismaService) {}

  // ── Laser Areas ──

  async findAllAreas(tenantId: string) {
    return this.prisma.laserArea.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
    });
  }

  async findOneArea(id: string, tenantId: string) {
    const area = await this.prisma.laserArea.findFirst({
      where: { id, tenantId },
    });
    if (!area) throw new NotFoundException('Laser area not found');
    return area;
  }

  async createArea(tenantId: string, dto: CreateLaserAreaDto) {
    return this.prisma.laserArea.create({
      data: { tenantId, ...dto },
    });
  }

  async updateArea(id: string, tenantId: string, dto: UpdateLaserAreaDto) {
    await this.findOneArea(id, tenantId);
    return this.prisma.laserArea.update({ where: { id }, data: dto });
  }

  async removeArea(id: string, tenantId: string) {
    await this.findOneArea(id, tenantId);
    await this.prisma.laserArea.update({
      where: { id },
      data: { isActive: false },
    });
    return { message: 'Laser area deactivated' };
  }

  // ── Laser Sessions ──

  async findAllSessions(
    tenantId: string,
    branchId?: string,
    patientId?: string,
    page = 1,
    limit = 20,
  ) {
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

  async findOneSession(id: string, tenantId: string) {
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
    if (!session) throw new NotFoundException('Laser session not found');
    return session;
  }

  async createSession(tenantId: string, dto: CreateLaserSessionDto) {
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

  async updateSession(id: string, tenantId: string, dto: UpdateLaserSessionDto) {
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

  async removeSession(id: string, tenantId: string) {
    await this.findOneSession(id, tenantId);
    await this.prisma.laserSession.delete({ where: { id } });
    return { message: 'Laser session deleted' };
  }

  async addSessionPhoto(id: string, tenantId: string, dto: AddSessionPhotoDto) {
    await this.findOneSession(id, tenantId);
    return this.prisma.laserSessionPhoto.create({
      data: { sessionId: id, ...dto },
    });
  }

  async removeSessionPhoto(sessionId: string, photoId: string, tenantId: string) {
    await this.findOneSession(sessionId, tenantId);
    await this.prisma.laserSessionPhoto.delete({ where: { id: photoId } });
    return { message: 'Photo removed' };
  }
}
