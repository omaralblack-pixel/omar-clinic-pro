import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PackagesService } from './packages.service';
import {
  CreateServicePackageDto,
  UpdateServicePackageDto,
  AssignPatientPackageDto,
  UseSessionDto,
  UpdatePatientPackageDto,
} from './dto/package.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';

@ApiTags('Packages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('packages')
export class PackagesController {
  constructor(private packagesService: PackagesService) {}

  @Get('patient/tracking')
  @ApiOperation({ summary: 'Patient package tracking' })
  findPatientPackages(
    @TenantId() tenantId: string,
    @Query('patientId') patientId?: string,
  ) {
    return this.packagesService.findPatientPackages(tenantId!, patientId);
  }

  @Get('patient/tracking/:id')
  findOnePatientPackage(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.packagesService.findOnePatientPackage(id, tenantId!);
  }

  @Post('patient/assign')
  @ApiOperation({ summary: 'Assign package to patient' })
  assignPackage(@TenantId() tenantId: string, @Body() dto: AssignPatientPackageDto) {
    return this.packagesService.assignPackage(tenantId!, dto);
  }

  @Patch('patient/tracking/:id/use-session')
  @ApiOperation({ summary: 'Deduct session from patient package' })
  useSession(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UseSessionDto,
  ) {
    return this.packagesService.useSession(id, tenantId!, dto);
  }

  @Patch('patient/tracking/:id')
  updatePatientPackage(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdatePatientPackageDto,
  ) {
    return this.packagesService.updatePatientPackage(id, tenantId!, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List service packages' })
  findAllPackages(
    @TenantId() tenantId: string,
    @Query('activeOnly') activeOnly?: boolean,
  ) {
    return this.packagesService.findAllPackages(tenantId!, activeOnly !== false);
  }

  @Get(':id')
  findOnePackage(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.packagesService.findOnePackage(id, tenantId!);
  }

  @Post()
  createPackage(@TenantId() tenantId: string, @Body() dto: CreateServicePackageDto) {
    return this.packagesService.createPackage(tenantId!, dto);
  }

  @Patch(':id')
  updatePackage(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateServicePackageDto,
  ) {
    return this.packagesService.updatePackage(id, tenantId!, dto);
  }

  @Delete(':id')
  removePackage(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.packagesService.removePackage(id, tenantId!);
  }
}
