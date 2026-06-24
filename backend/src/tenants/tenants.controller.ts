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
import { TenantsService } from './tenants.service';
import {
  CreateTenantDto,
  UpdateTenantDto,
  CreateSubscriptionPlanDto,
  UpdateSubscriptionPlanDto,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from './dto/tenant.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/auth.decorators';
import { UserRole } from '@prisma/client';

@ApiTags('Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @Get('plans/all')
  @ApiOperation({ summary: 'List subscription plans' })
  findAllPlans(@Query('activeOnly') activeOnly?: boolean) {
    return this.tenantsService.findAllPlans(activeOnly !== false);
  }

  @Post('plans')
  createPlan(@Body() dto: CreateSubscriptionPlanDto) {
    return this.tenantsService.createPlan(dto);
  }

  @Patch('plans/:planId')
  updatePlan(@Param('planId') planId: string, @Body() dto: UpdateSubscriptionPlanDto) {
    return this.tenantsService.updatePlan(planId, dto);
  }

  @Post('subscriptions')
  @ApiOperation({ summary: 'Assign subscription to tenant' })
  createSubscription(@Body() dto: CreateSubscriptionDto) {
    return this.tenantsService.createSubscription(dto);
  }

  @Patch('subscriptions/:id')
  updateSubscription(@Param('id') id: string, @Body() dto: UpdateSubscriptionDto) {
    return this.tenantsService.updateSubscription(id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all tenants (super admin)' })
  findAllTenants(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.tenantsService.findAllTenants(page, limit);
  }

  @Get(':id')
  findOneTenant(@Param('id') id: string) {
    return this.tenantsService.findOneTenant(id);
  }

  @Post()
  createTenant(@Body() dto: CreateTenantDto) {
    return this.tenantsService.createTenant(dto);
  }

  @Patch(':id')
  updateTenant(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.tenantsService.updateTenant(id, dto);
  }
}
