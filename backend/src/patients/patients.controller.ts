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
import { PatientsService } from './patients.service';
import { CreatePatientDto, UpdatePatientDto, UpdateMedicalInfoDto } from './dto/patient.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, TenantId } from '../common/decorators/current-user.decorator';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'List all patients' })
  findAll(
    @TenantId() tenantId: string,
    @Query('branchId') branchId?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.patientsService.findAll(tenantId!, branchId, search, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.patientsService.findOne(id, tenantId!);
  }

  @Get(':id/timeline')
  getTimeline(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.patientsService.getTimeline(id, tenantId!);
  }

  @Post()
  create(@TenantId() tenantId: string, @Body() dto: CreatePatientDto) {
    return this.patientsService.create(tenantId!, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, tenantId!, dto);
  }

  @Patch(':id/medical-info')
  updateMedicalInfo(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateMedicalInfoDto,
  ) {
    return this.patientsService.updateMedicalInfo(id, tenantId!, dto);
  }
}
