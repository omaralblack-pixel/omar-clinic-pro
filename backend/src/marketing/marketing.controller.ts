import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MarketingService } from './marketing.service';
import {
  CreateLeadDto,
  UpdateLeadDto,
  CreateCampaignDto,
  UpdateCampaignDto,
  CreateFollowUpDto,
  CompleteFollowUpDto,
} from './dto/marketing.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';
import { LeadStatus } from '@prisma/client';

@ApiTags('Marketing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('marketing')
export class MarketingController {
  constructor(private marketingService: MarketingService) {}

  @Get('leads')
  findLeads(
    @TenantId() tenantId: string,
    @Query('status') status?: LeadStatus,
    @Query('source') source?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.marketingService.findLeads(tenantId!, status, source, page, limit);
  }

  @Get('leads/:id')
  findOneLead(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.marketingService.findOneLead(id, tenantId!);
  }

  @Post('leads')
  createLead(@TenantId() tenantId: string, @Body() dto: CreateLeadDto) {
    return this.marketingService.createLead(tenantId!, dto);
  }

  @Patch('leads/:id')
  updateLead(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateLeadDto,
  ) {
    return this.marketingService.updateLead(id, tenantId!, dto);
  }

  @Get('campaigns')
  findCampaigns(@TenantId() tenantId: string) {
    return this.marketingService.findCampaigns(tenantId!);
  }

  @Get('campaigns/:id')
  findOneCampaign(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.marketingService.findOneCampaign(id, tenantId!);
  }

  @Post('campaigns')
  createCampaign(@TenantId() tenantId: string, @Body() dto: CreateCampaignDto) {
    return this.marketingService.createCampaign(tenantId!, dto);
  }

  @Patch('campaigns/:id')
  updateCampaign(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateCampaignDto,
  ) {
    return this.marketingService.updateCampaign(id, tenantId!, dto);
  }

  @Get('follow-ups/pending')
  @ApiOperation({ summary: 'Pending follow-ups' })
  pendingFollowUps(@TenantId() tenantId: string) {
    return this.marketingService.getPendingFollowUps(tenantId!);
  }

  @Post('leads/:id/follow-ups')
  createFollowUp(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: CreateFollowUpDto,
  ) {
    return this.marketingService.createFollowUp(id, tenantId!, dto);
  }

  @Patch('leads/:leadId/follow-ups/:followUpId/complete')
  completeFollowUp(
    @Param('leadId') leadId: string,
    @Param('followUpId') followUpId: string,
    @TenantId() tenantId: string,
    @Body() dto: CompleteFollowUpDto,
  ) {
    return this.marketingService.completeFollowUp(leadId, followUpId, tenantId!, dto);
  }
}
