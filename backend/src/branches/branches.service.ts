import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/branch.dto';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string, activeOnly = true) {
    return this.prisma.branch.findMany({
      where: { tenantId, ...(activeOnly && { isActive: true }) },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    const branch = await this.prisma.branch.findFirst({
      where: { id, tenantId },
    });
    if (!branch) throw new NotFoundException('Branch not found');
    return branch;
  }

  async create(tenantId: string, dto: CreateBranchDto) {
    const existing = await this.prisma.branch.findFirst({
      where: { tenantId, code: dto.code },
    });
    if (existing) throw new ConflictException('Branch code already exists');

    return this.prisma.branch.create({
      data: {
        tenantId,
        name: dto.name,
        nameAr: dto.nameAr,
        code: dto.code,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        city: dto.city,
        settings: dto.settings as Prisma.InputJsonValue | undefined,
      },
    });
  }

  async update(id: string, tenantId: string, dto: UpdateBranchDto) {
    await this.findOne(id, tenantId);

    if (dto.code) {
      const existing = await this.prisma.branch.findFirst({
        where: { tenantId, code: dto.code, NOT: { id } },
      });
      if (existing) throw new ConflictException('Branch code already exists');
    }

    return this.prisma.branch.update({
      where: { id },
      data: {
        name: dto.name,
        nameAr: dto.nameAr,
        code: dto.code,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        city: dto.city,
        isActive: dto.isActive,
        settings: dto.settings as Prisma.InputJsonValue | undefined,
      },
    });
  }

  async deactivate(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.branch.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
