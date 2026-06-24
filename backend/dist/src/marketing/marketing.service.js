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
exports.MarketingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MarketingService = class MarketingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findLeads(tenantId, status, source, page = 1, limit = 20) {
        const where = {
            tenantId,
            ...(status && { status }),
            ...(source && { source: source }),
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
    async findOneLead(id, tenantId) {
        const lead = await this.prisma.lead.findFirst({
            where: { id, tenantId },
            include: {
                campaign: true,
                followUps: { orderBy: { createdAt: 'desc' } },
                patient: { select: { id: true, firstName: true, lastName: true } },
            },
        });
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        return lead;
    }
    async createLead(tenantId, dto) {
        return this.prisma.lead.create({
            data: { tenantId, ...dto },
        });
    }
    async updateLead(id, tenantId, dto) {
        await this.findOneLead(id, tenantId);
        return this.prisma.lead.update({ where: { id }, data: dto });
    }
    async findCampaigns(tenantId) {
        return this.prisma.campaign.findMany({
            where: { tenantId },
            include: { _count: { select: { leads: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOneCampaign(id, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
            include: { leads: { take: 50, orderBy: { createdAt: 'desc' } } },
        });
        if (!campaign)
            throw new common_1.NotFoundException('Campaign not found');
        return campaign;
    }
    async createCampaign(tenantId, dto) {
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
    async updateCampaign(id, tenantId, dto) {
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
    async createFollowUp(leadId, tenantId, dto) {
        await this.findOneLead(leadId, tenantId);
        return this.prisma.followUp.create({
            data: {
                leadId,
                notes: dto.notes,
                scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
            },
        });
    }
    async completeFollowUp(leadId, followUpId, tenantId, dto) {
        await this.findOneLead(leadId, tenantId);
        const followUp = await this.prisma.followUp.findFirst({
            where: { id: followUpId, leadId },
        });
        if (!followUp)
            throw new common_1.NotFoundException('Follow-up not found');
        return this.prisma.followUp.update({
            where: { id: followUpId },
            data: {
                completedAt: new Date(),
                notes: dto.notes ?? followUp.notes,
            },
        });
    }
    async getPendingFollowUps(tenantId) {
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
};
exports.MarketingService = MarketingService;
exports.MarketingService = MarketingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketingService);
//# sourceMappingURL=marketing.service.js.map