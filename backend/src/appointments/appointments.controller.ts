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
import { AppointmentsService } from './appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  UpdateAppointmentStatusDto,
  CreateReminderDto,
} from './dto/appointment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';
import { AppointmentStatus } from '@prisma/client';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  @ApiOperation({ summary: 'List appointments' })
  findAll(
    @TenantId() tenantId: string,
    @Query('branchId') branchId?: string,
    @Query('status') status?: AppointmentStatus,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.appointmentsService.findAll(tenantId!, branchId, status, page, limit);
  }

  @Get('calendar/daily')
  @ApiOperation({ summary: 'Daily calendar view' })
  daily(
    @TenantId() tenantId: string,
    @Query('date') date: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.appointmentsService.getCalendar(tenantId!, 'daily', date, branchId);
  }

  @Get('calendar/weekly')
  @ApiOperation({ summary: 'Weekly calendar view' })
  weekly(
    @TenantId() tenantId: string,
    @Query('date') date: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.appointmentsService.getCalendar(tenantId!, 'weekly', date, branchId);
  }

  @Get('calendar/monthly')
  @ApiOperation({ summary: 'Monthly calendar view' })
  monthly(
    @TenantId() tenantId: string,
    @Query('date') date: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.appointmentsService.getCalendar(tenantId!, 'monthly', date, branchId);
  }

  @Get('reminders/pending')
  @ApiOperation({ summary: 'Pending appointment reminders' })
  pendingReminders(@TenantId() tenantId: string) {
    return this.appointmentsService.getPendingReminders(tenantId!);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.appointmentsService.findOne(id, tenantId!);
  }

  @Post()
  create(@TenantId() tenantId: string, @Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(tenantId!, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, tenantId!, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update appointment status' })
  updateStatus(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateAppointmentStatusDto,
  ) {
    return this.appointmentsService.updateStatus(id, tenantId!, dto);
  }

  @Post(':id/reminders')
  @ApiOperation({ summary: 'Schedule appointment reminder' })
  createReminder(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: CreateReminderDto,
  ) {
    return this.appointmentsService.createReminder(id, tenantId!, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.appointmentsService.remove(id, tenantId!);
  }
}
