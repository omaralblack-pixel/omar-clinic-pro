import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { ReportFilterDto } from './dto/reports.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('revenue')
  @ApiOperation({
    summary: 'Revenue report (JSON)',
    description: 'PDF/Excel export planned for future release',
  })
  @ApiOkResponse({ description: 'JSON revenue report' })
  revenue(@TenantId() tenantId: string, @Query() filters: ReportFilterDto) {
    return this.reportsService.getRevenueReport(tenantId!, filters);
  }

  @Get('appointments')
  @ApiOperation({
    summary: 'Appointments report (JSON)',
    description: 'PDF/Excel export planned for future release',
  })
  appointments(@TenantId() tenantId: string, @Query() filters: ReportFilterDto) {
    return this.reportsService.getAppointmentsReport(tenantId!, filters);
  }

  @Get('patients')
  @ApiOperation({
    summary: 'Patients report (JSON)',
    description: 'PDF/Excel export planned for future release',
  })
  patients(@TenantId() tenantId: string, @Query() filters: ReportFilterDto) {
    return this.reportsService.getPatientsReport(tenantId!, filters);
  }
}
