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
import { StaffService } from './staff.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  RecordAttendanceDto,
  CreateLeaveRequestDto,
  UpdateLeaveStatusDto,
  CreatePayrollDto,
} from './dto/staff.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { LeaveStatus } from '@prisma/client';

@ApiTags('Staff')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get('employees')
  @ApiOperation({ summary: 'List employees' })
  findEmployees(@Query('branchId') branchId?: string) {
    return this.staffService.findEmployees(branchId);
  }

  @Get('employees/:id')
  findOneEmployee(@Param('id') id: string) {
    return this.staffService.findOneEmployee(id);
  }

  @Post('employees')
  createEmployee(@Body() dto: CreateEmployeeDto) {
    return this.staffService.createEmployee(dto);
  }

  @Patch('employees/:id')
  updateEmployee(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.staffService.updateEmployee(id, dto);
  }

  @Get('attendance')
  getAttendance(
    @Query('branchId') branchId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.staffService.getAttendance(branchId, from, to);
  }

  @Post('attendance')
  @ApiOperation({ summary: 'Record attendance' })
  recordAttendance(@Body() dto: RecordAttendanceDto) {
    return this.staffService.recordAttendance(dto);
  }

  @Get('leave')
  getLeaveRequests(
    @Query('employeeId') employeeId?: string,
    @Query('status') status?: LeaveStatus,
  ) {
    return this.staffService.getLeaveRequests(employeeId, status);
  }

  @Post('leave')
  createLeaveRequest(@Body() dto: CreateLeaveRequestDto) {
    return this.staffService.createLeaveRequest(dto);
  }

  @Patch('leave/:id/status')
  updateLeaveStatus(@Param('id') id: string, @Body() dto: UpdateLeaveStatusDto) {
    return this.staffService.updateLeaveStatus(id, dto);
  }

  @Get('payroll')
  getPayroll(
    @Query('employeeId') employeeId?: string,
    @Query('year') year?: number,
  ) {
    return this.staffService.getPayroll(employeeId, year);
  }

  @Post('payroll')
  @ApiOperation({ summary: 'Create payroll record' })
  createPayroll(@Body() dto: CreatePayrollDto) {
    return this.staffService.createPayroll(dto);
  }
}
