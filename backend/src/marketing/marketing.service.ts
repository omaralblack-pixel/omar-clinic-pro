import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateLeadDto,
  UpdateLeadDto,
  CreateCampaignDto,
  UpdateCampaignDto,
  CreateFollowUpDto,
  CompleteFollowUpDto,
} from './dto/marketing.dto';
import { LeadStatus } from '@prisma/client';

@Injectable()
export class MarketingService {
  constructor(private prisma: PrismaService) {}

  async findLeads(tenantId: string, status?: LeadStatus, source?: string, page = 1, limit = 20) {
    const where = {
      tenantId,
      ...(status && { status }),
      ...(source && { source: source as never }),
    };

    const [data, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        include: {
          campaign: { select: { name: true } },
          followUps: { orderBy: { createdAt: 'desc' }, take: 5 },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOneLead(id: string, tenantId: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, tenantId },
      include: {
        campaign: true,
        followUps: { orderBy: { createdAt: 'desc' } },
        patient: { select: { id: true, firstName: true, lastName: true } },
      },
    });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async createLead(tenantId: string, dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: { tenantId, ...dto },
    });
  }

  async updateLead(id: string, tenantId: string, dto: UpdateLeadDto) {
    await this.findOneLead(id, tenantId);
    return this.prisma.lead.update({ where: { id }, data: dto });
  }

  async findCampaigns(tenantId: string) {
    return this.prisma.campaign.findMany({
      where: { tenantId },
      include: { _count: { select: { leads: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneCampaign(id: string, tenantId: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
      include: { leads: { take: 50, orderBy: { createdAt: 'desc' } } },
    });
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  async createCampaign(tenantId: string, dto: CreateCampaignDto) {
    return this.prisma.campaign.create({
      data: {
        tenantId,
        name: dto.name,
        nameAr: dto.nameAr,
        platform: dto.platform,
        budget: dto.budget,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async updateCampaign(id: string, tenantId: string, dto: UpdateCampaignDto) {
    await this.findOneCampaign(id, tenantId);
    return this.prisma.campaign.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async createFollowUp(leadId: string, tenantId: string, dto: CreateFollowUpDto) {
    await this.findOneLead(leadId, tenantId);
    return this.prisma.followUp.create({
      data: {
        leadId,
        notes: dto.notes,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      },
    });
  }

  async completeFollowUp(
    leadId: string,
    followUpId: string,
    tenantId: string,
    dto: CompleteFollowUpDto,
  ) {
    await this.findOneLead(leadId, tenantId);
    const followUp = await this.prisma.followUp.findFirst({
      where: { id: followUpId, leadId },
    });
    if (!followUp) throw new NotFoundException('Follow-up not found');

    return this.prisma.followUp.update({
      where: { id: followUpId },
      data: {
        completedAt: new Date(),
        notes: dto.notes ?? followUp.notes,
      },
    });
  }

  async getPendingFollowUps(tenantId: string) {
    return this.prisma.followUp.findMany({
      where: {
        completedAt: null,
        lead: { tenantId },
      },
      include: {
        lead: { select: { id: true, name: true, phone: true, status: true } },
      },
      orderBy: { scheduledAt: 'asc' },
    });
  }
}
