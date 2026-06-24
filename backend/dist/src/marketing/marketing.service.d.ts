import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, UpdateLeadDto, CreateCampaignDto, UpdateCampaignDto, CreateFollowUpDto, CompleteFollowUpDto } from './dto/marketing.dto';
import { LeadStatus } from '@prisma/client';
export declare class MarketingService {
    private prisma;
    constructor(prisma: PrismaService);
    findLeads(tenantId: string, status?: LeadStatus, source?: string, page?: number, limit?: number): Promise<{
        data: ({
            campaign: {
                name: string;
            } | null;
            followUps: {
                id: string;
                createdAt: Date;
                notes: string;
                scheduledAt: Date | null;
                leadId: string;
                completedAt: Date | null;
            }[];
        } & {
            email: string | null;
            tenantId: string;
            branchId: string | null;
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            status: import(".prisma/client").$Enums.LeadStatus;
            patientId: string | null;
            notes: string | null;
            campaignId: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOneLead(id: string, tenantId: string): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
        campaign: {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            status: import(".prisma/client").$Enums.CampaignStatus;
            startDate: Date | null;
            endDate: Date | null;
            platform: import(".prisma/client").$Enums.LeadSource;
            budget: import("@prisma/client/runtime/library").Decimal | null;
        } | null;
        followUps: {
            id: string;
            createdAt: Date;
            notes: string;
            scheduledAt: Date | null;
            leadId: string;
            completedAt: Date | null;
        }[];
    } & {
        email: string | null;
        tenantId: string;
        branchId: string | null;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import(".prisma/client").$Enums.LeadStatus;
        patientId: string | null;
        notes: string | null;
        campaignId: string | null;
        source: import(".prisma/client").$Enums.LeadSource;
    }>;
    createLead(tenantId: string, dto: CreateLeadDto): Promise<{
        email: string | null;
        tenantId: string;
        branchId: string | null;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import(".prisma/client").$Enums.LeadStatus;
        patientId: string | null;
        notes: string | null;
        campaignId: string | null;
        source: import(".prisma/client").$Enums.LeadSource;
    }>;
    updateLead(id: string, tenantId: string, dto: UpdateLeadDto): Promise<{
        email: string | null;
        tenantId: string;
        branchId: string | null;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import(".prisma/client").$Enums.LeadStatus;
        patientId: string | null;
        notes: string | null;
        campaignId: string | null;
        source: import(".prisma/client").$Enums.LeadSource;
    }>;
    findCampaigns(tenantId: string): Promise<({
        _count: {
            leads: number;
        };
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        status: import(".prisma/client").$Enums.CampaignStatus;
        startDate: Date | null;
        endDate: Date | null;
        platform: import(".prisma/client").$Enums.LeadSource;
        budget: import("@prisma/client/runtime/library").Decimal | null;
    })[]>;
    findOneCampaign(id: string, tenantId: string): Promise<{
        leads: {
            email: string | null;
            tenantId: string;
            branchId: string | null;
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            status: import(".prisma/client").$Enums.LeadStatus;
            patientId: string | null;
            notes: string | null;
            campaignId: string | null;
            source: import(".prisma/client").$Enums.LeadSource;
        }[];
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        status: import(".prisma/client").$Enums.CampaignStatus;
        startDate: Date | null;
        endDate: Date | null;
        platform: import(".prisma/client").$Enums.LeadSource;
        budget: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    createCampaign(tenantId: string, dto: CreateCampaignDto): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        status: import(".prisma/client").$Enums.CampaignStatus;
        startDate: Date | null;
        endDate: Date | null;
        platform: import(".prisma/client").$Enums.LeadSource;
        budget: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    updateCampaign(id: string, tenantId: string, dto: UpdateCampaignDto): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        status: import(".prisma/client").$Enums.CampaignStatus;
        startDate: Date | null;
        endDate: Date | null;
        platform: import(".prisma/client").$Enums.LeadSource;
        budget: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    createFollowUp(leadId: string, tenantId: string, dto: CreateFollowUpDto): Promise<{
        id: string;
        createdAt: Date;
        notes: string;
        scheduledAt: Date | null;
        leadId: string;
        completedAt: Date | null;
    }>;
    completeFollowUp(leadId: string, followUpId: string, tenantId: string, dto: CompleteFollowUpDto): Promise<{
        id: string;
        createdAt: Date;
        notes: string;
        scheduledAt: Date | null;
        leadId: string;
        completedAt: Date | null;
    }>;
    getPendingFollowUps(tenantId: string): Promise<({
        lead: {
            id: string;
            phone: string;
            name: string;
            status: import(".prisma/client").$Enums.LeadStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        notes: string;
        scheduledAt: Date | null;
        leadId: string;
        completedAt: Date | null;
    })[]>;
}
