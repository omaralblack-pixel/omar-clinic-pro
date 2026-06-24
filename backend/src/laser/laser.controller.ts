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
import { LaserService } from './laser.service';
import {
  CreateLaserAreaDto,
  UpdateLaserAreaDto,
  CreateLaserSessionDto,
  UpdateLaserSessionDto,
  AddSessionPhotoDto,
} from './dto/laser.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';

@ApiTags('Laser')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('laser')
export class LaserController {
  constructor(private laserService: LaserService) {}

  @Get('areas')
  @ApiOperation({ summary: 'List laser treatment areas' })
  findAllAreas(@TenantId() tenantId: string) {
    return this.laserService.findAllAreas(tenantId!);
  }

  @Get('areas/:id')
  findOneArea(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.laserService.findOneArea(id, tenantId!);
  }

  @Post('areas')
  createArea(@TenantId() tenantId: string, @Body() dto: CreateLaserAreaDto) {
    return this.laserService.createArea(tenantId!, dto);
  }

  @Patch('areas/:id')
  updateArea(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateLaserAreaDto,
  ) {
    return this.laserService.updateArea(id, tenantId!, dto);
  }

  @Delete('areas/:id')
  removeArea(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.laserService.removeArea(id, tenantId!);
  }

  @Get('sessions')
  @ApiOperation({ summary: 'List laser sessions' })
  findAllSessions(
    @TenantId() tenantId: string,
    @Query('branchId') branchId?: string,
    @Query('patientId') patientId?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.laserService.findAllSessions(tenantId!, branchId, patientId, page, limit);
  }

  @Get('sessions/:id')
  findOneSession(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.laserService.findOneSession(id, tenantId!);
  }

  @Post('sessions')
  createSession(@TenantId() tenantId: string, @Body() dto: CreateLaserSessionDto) {
    return this.laserService.createSession(tenantId!, dto);
  }

  @Patch('sessions/:id')
  updateSession(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateLaserSessionDto,
  ) {
    return this.laserService.updateSession(id, tenantId!, dto);
  }

  @Delete('sessions/:id')
  removeSession(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.laserService.removeSession(id, tenantId!);
  }

  @Post('sessions/:id/photos')
  @ApiOperation({ summary: 'Add before/after photo to session' })
  addPhoto(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: AddSessionPhotoDto,
  ) {
    return this.laserService.addSessionPhoto(id, tenantId!, dto);
  }

  @Delete('sessions/:sessionId/photos/:photoId')
  removePhoto(
    @Param('sessionId') sessionId: string,
    @Param('photoId') photoId: string,
    @TenantId() tenantId: string,
  ) {
    return this.laserService.removeSessionPhoto(sessionId, photoId, tenantId!);
  }
}
