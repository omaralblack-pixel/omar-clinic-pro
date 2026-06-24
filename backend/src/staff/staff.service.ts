import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  RecordAttendanceDto,
  CreateLeaveRequestDto,
  UpdateLeaveStatusDto,
  CreatePayrollDto,
} from './dto/staff.dto';
import { LeaveStatus } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async findEmployees(branchId?: string) {
    return this.prisma.employee.findMany({
      where: { ...(branchId && { branchId }), isActive: true },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            phone: true,
          },
        },
        branch: { select: { name: true } },
      },
      orderBy: { hireDate: 'desc' },
    });
  }

  async findOneEmployee(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        user: true,
        branch: true,
        attendanceRecords: { take: 30, orderBy: { date: 'desc' } },
        leaveRequests: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async createEmployee(dto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        userId: dto.userId,
        branchId: dto.branchId,
        employeeNo: dto.employeeNo,
        department: dto.department,
        jobTitle: dto.jobTitle,
        salary: dto.salary,
        hireDate: new Date(dto.hireDate),
      },
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    });
  }

  async updateEmployee(id: string, dto: UpdateEmployeeDto) {
    await this.findOneEmployee(id);
    return this.prisma.employee.update({
      where: { id },
      data: {
        ...dto,
        hireDate: dto.hireDate ? new Date(dto.hireDate) : undefined,
      },
    });
  }

  async recordAttendance(dto: RecordAttendanceDto) {
    return this.prisma.attendanceRecord.upsert({
      where: {
        employeeId_date: {
          employeeId: dto.employeeId,
          date: new Date(dto.date),
        },
      },
      create: {
        employeeId: dto.employeeId,
        branchId: dto.branchId,
        date: new Date(dto.date),
        checkIn: dto.checkIn ? new Date(dto.checkIn) : undefined,
        checkOut: dto.checkOut ? new Date(dto.checkOut) : undefined,
        status: dto.status,
        notes: dto.notes,
      },
      update: {
        checkIn: dto.checkIn ? new Date(dto.checkIn) : undefined,
        checkOut: dto.checkOut ? new Date(dto.checkOut) : undefined,
        status: dto.status,
        notes: dto.notes,
      },
    });
  }

  async getAttendance(branchId?: string, from?: string, to?: string) {
    return this.prisma.attendanceRecord.findMany({
      where: {
        ...(branchId && { branchId }),
        ...(from &&
          to && {
            date: { gte: new Date(from), lte: new Date(to) },
          }),
      },
      include: {
        employee: {
          include: { user: { select: { firstName: true, lastName: true } } },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async createLeaveRequest(dto: CreateLeaveRequestDto) {
    return this.prisma.leaveRequest.create({
      data: {
        employeeId: dto.employeeId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        reason: dto.reason,
      },
    });
  }

  async updateLeaveStatus(id: string, dto: UpdateLeaveStatusDto) {
    const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!leave) throw new NotFoundException('Leave request not found');

    return this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: dto.status,
        approvedAt:
          dto.status === LeaveStatus.APPROVED ? new Date() : leave.approvedAt,
      },
    });
  }

  async getLeaveRequests(employeeId?: string, status?: LeaveStatus) {
    return this.prisma.leaveRequest.findMany({
      where: {
        ...(employeeId && { employeeId }),
        ...(status && { status }),
      },
      include: {
        employee: {
          include: { user: { select: { firstName: true, lastName: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPayroll(dto: CreatePayrollDto) {
    const bonuses = dto.bonuses ?? 0;
    const deductions = dto.deductions ?? 0;
    const netSalary = dto.baseSalary + bonuses - deductions;

    return this.prisma.payrollRecord.create({
      data: {
        employeeId: dto.employeeId,
        month: dto.month,
        year: dto.year,
        baseSalary: dto.baseSalary,
        bonuses,
        deductions,
        netSalary,
      },
    });
  }

  async getPayroll(employeeId?: string, year?: number) {
    return this.prisma.payrollRecord.findMany({
      where: {
        ...(employeeId && { employeeId }),
        ...(year && { year }),
      },
      include: {
        employee: {
          include: { user: { select: { firstName: true, lastName: true } } },
        },
      },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }
}
