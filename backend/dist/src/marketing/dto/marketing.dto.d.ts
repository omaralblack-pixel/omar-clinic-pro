import { LeadSource, LeadStatus, CampaignStatus } from '@prisma/client';
export declare class CreateLeadDto {
    branchId?: string;
    campaignId?: string;
    name: string;
    phone: string;
    email?: string;
    source: LeadSource;
    notes?: string;
}
declare const UpdateLeadDto_base: import("@nestjs/common").Type<Partial<CreateLeadDto>>;
export declare class UpdateLeadDto extends UpdateLeadDto_base {
    status?: LeadStatus;
    patientId?: string;
}
export declare class CreateCampaignDto {
    name: string;
    nameAr?: string;
    platform: LeadSource;
    budget?: number;
    startDate?: string;
    endDate?: string;
}
declare const UpdateCampaignDto_base: import("@nestjs/common").Type<Partial<CreateCampaignDto>>;
export declare class UpdateCampaignDto extends UpdateCampaignDto_base {
    status?: CampaignStatus;
}
export declare class CreateFollowUpDto {
    notes: string;
    scheduledAt?: string;
}
export declare class CompleteFollowUpDto {
    notes?: string;
}
export {};
