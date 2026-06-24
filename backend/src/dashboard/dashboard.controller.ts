import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('stats')
  getStats(@TenantId() tenantId: string, @Query('branchId') branchId?: string) {
    return this.dashboardService.getStats(tenantId!, branchId);
  }

  @Get('charts')
  getCharts(
    @TenantId() tenantId: string,
    @Query('branchId') branchId?: string,
    @Query('days') days?: number,
  ) {
    return this.dashboardService.getCharts(tenantId!, branchId, days);
  }
}
