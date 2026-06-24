"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let StaffService = class StaffService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findEmployees(branchId) {
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
    async findOneEmployee(id) {
        const employee = await this.prisma.employee.findUnique({
            where: { id },
            include: {
                user: true,
                branch: true,
                attendanceRecords: { take: 30, orderBy: { date: 'desc' } },
                leaveRequests: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        return employee;
    }
    async createEmployee(dto) {
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
    async updateEmployee(id, dto) {
        await this.findOneEmployee(id);
        return this.prisma.employee.update({
            where: { id },
            data: {
                ...dto,
                hireDate: dto.hireDate ? new Date(dto.hireDate) : undefined,
            },
        });
    }
    async recordAttendance(dto) {
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
    async getAttendance(branchId, from, to) {
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
    async createLeaveRequest(dto) {
        return this.prisma.leaveRequest.create({
            data: {
                employeeId: dto.employeeId,
                startDate: new Date(dto.startDate),
                endDate: new Date(dto.endDate),
                reason: dto.reason,
            },
        });
    }
    async updateLeaveStatus(id, dto) {
        const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
        if (!leave)
            throw new common_1.NotFoundException('Leave request not found');
        return this.prisma.leaveRequest.update({
            where: { id },
            data: {
                status: dto.status,
                approvedAt: dto.status === client_1.LeaveStatus.APPROVED ? new Date() : leave.approvedAt,
            },
        });
    }
    async getLeaveRequests(employeeId, status) {
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
    async createPayroll(dto) {
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
    async getPayroll(employeeId, year) {
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
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaffService);
//# sourceMappingURL=staff.service.js.map