import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsEmail,
  IsDateString,
  Min,
} from 'class-validator';
import { LeadSource, LeadStatus, CampaignStatus } from '@prisma/client';

export class CreateLeadDto {
  @ApiPropertyOptional() @IsOptional() @IsString() branchId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() campaignId?: string;
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() phone: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiProperty({ enum: LeadSource }) @IsEnum(LeadSource) source: LeadSource;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class UpdateLeadDto extends PartialType(CreateLeadDto) {
  @ApiPropertyOptional({ enum: LeadStatus })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiPropertyOptional() @IsOptional() @IsString() patientId?: string;
}

export class CreateCampaignDto {
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() nameAr?: string;
  @ApiProperty({ enum: LeadSource }) @IsEnum(LeadSource) platform: LeadSource;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) budget?: number;
  @ApiPropertyOptional() @IsOptional() @IsDateString() startDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() endDate?: string;
}

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {
  @ApiPropertyOptional({ enum: CampaignStatus })
  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;
}

export class CreateFollowUpDto {
  @ApiProperty() @IsString() notes: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() scheduledAt?: string;
}

export class CompleteFollowUpDto {
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
