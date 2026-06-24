import { StaffService } from './staff.service';
import { CreateEmployeeDto, UpdateEmployeeDto, RecordAttendanceDto, CreateLeaveRequestDto, UpdateLeaveStatusDto, CreatePayrollDto } from './dto/staff.dto';
import { LeaveStatus } from '@prisma/client';
export declare class StaffController {
    private staffService;
    constructor(staffService: StaffService);
    findEmployees(branchId?: string): Promise<({
        branch: {
            name: string;
        };
        user: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            firstName: string;
            lastName: string;
            phone: string | null;
        };
    } & {
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        employeeNo: string;
        department: string | null;
        jobTitle: string | null;
        salary: import("@prisma/client/runtime/library").Decimal | null;
        hireDate: Date;
    })[]>;
    findOneEmployee(id: string): Promise<{
        branch: {
            email: string | null;
            tenantId: string;
            id: string;
            phone: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            address: string | null;
            settings: import("@prisma/client/runtime/library").JsonValue;
            code: string;
            city: string | null;
        };
        user: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            tenantId: string | null;
            branchId: string | null;
            id: string;
            passwordHash: string;
            firstName: string;
            lastName: string;
            firstNameAr: string | null;
            lastNameAr: string | null;
            phone: string | null;
            avatar: string | null;
            isActive: boolean;
            emailVerified: boolean;
            twoFactorEnabled: boolean;
            twoFactorSecret: string | null;
            lastLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        attendanceRecords: {
            branchId: string;
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.AttendanceStatus;
            notes: string | null;
            date: Date;
            employeeId: string;
            checkIn: Date | null;
            checkOut: Date | null;
        }[];
        leaveRequests: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.LeaveStatus;
            startDate: Date;
            endDate: Date;
            reason: string;
            employeeId: string;
            approvedAt: Date | null;
        }[];
    } & {
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        employeeNo: string;
        department: string | null;
        jobTitle: string | null;
        salary: import("@prisma/client/runtime/library").Decimal | null;
        hireDate: Date;
    }>;
    createEmployee(dto: CreateEmployeeDto): Promise<{
        user: {
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        employeeNo: string;
        department: string | null;
        jobTitle: string | null;
        salary: import("@prisma/client/runtime/library").Decimal | null;
        hireDate: Date;
    }>;
    updateEmployee(id: string, dto: UpdateEmployeeDto): Promise<{
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        employeeNo: string;
        department: string | null;
        jobTitle: string | null;
        salary: import("@prisma/client/runtime/library").Decimal | null;
        hireDate: Date;
    }>;
    getAttendance(branchId?: string, from?: string, to?: string): Promise<({
        employee: {
            user: {
                firstName: string;
                lastName: string;
            };
        } & {
            branchId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            employeeNo: string;
            department: string | null;
            jobTitle: string | null;
            salary: import("@prisma/client/runtime/library").Decimal | null;
            hireDate: Date;
        };
    } & {
        branchId: string;
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.AttendanceStatus;
        notes: string | null;
        date: Date;
        employeeId: string;
        checkIn: Date | null;
        checkOut: Date | null;
    })[]>;
    recordAttendance(dto: RecordAttendanceDto): Promise<{
        branchId: string;
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.AttendanceStatus;
        notes: string | null;
        date: Date;
        employeeId: string;
        checkIn: Date | null;
        checkOut: Date | null;
    }>;
    getLeaveRequests(employeeId?: string, status?: LeaveStatus): Promise<({
        employee: {
            user: {
                firstName: string;
                lastName: string;
            };
        } & {
            branchId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            employeeNo: string;
            department: string | null;
            jobTitle: string | null;
            salary: import("@prisma/client/runtime/library").Decimal | null;
            hireDate: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.LeaveStatus;
        startDate: Date;
        endDate: Date;
        reason: string;
        employeeId: string;
        approvedAt: Date | null;
    })[]>;
    createLeaveRequest(dto: CreateLeaveRequestDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.LeaveStatus;
        startDate: Date;
        endDate: Date;
        reason: string;
        employeeId: string;
        approvedAt: Date | null;
    }>;
    updateLeaveStatus(id: string, dto: UpdateLeaveStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.LeaveStatus;
        startDate: Date;
        endDate: Date;
        reason: string;
        employeeId: string;
        approvedAt: Date | null;
    }>;
    getPayroll(employeeId?: string, year?: number): Promise<({
        employee: {
            user: {
                firstName: string;
                lastName: string;
            };
        } & {
            branchId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            employeeNo: string;
            department: string | null;
            jobTitle: string | null;
            salary: import("@prisma/client/runtime/library").Decimal | null;
            hireDate: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        paidAt: Date | null;
        year: number;
        month: number;
        employeeId: string;
        baseSalary: import("@prisma/client/runtime/library").Decimal;
        bonuses: import("@prisma/client/runtime/library").Decimal;
        deductions: import("@prisma/client/runtime/library").Decimal;
        netSalary: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    createPayroll(dto: CreatePayrollDto): Promise<{
        id: string;
        createdAt: Date;
        paidAt: Date | null;
        year: number;
        month: number;
        employeeId: string;
        baseSalary: import("@prisma/client/runtime/library").Decimal;
        bonuses: import("@prisma/client/runtime/library").Decimal;
        deductions: import("@prisma/client/runtime/library").Decimal;
        netSalary: import("@prisma/client/runtime/library").Decimal;
    }>;
}
