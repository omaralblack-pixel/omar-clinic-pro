import { AttendanceStatus, LeaveStatus } from '@prisma/client';
export declare class CreateEmployeeDto {
    userId: string;
    branchId: string;
    employeeNo: string;
    department?: string;
    jobTitle?: string;
    salary?: number;
    hireDate: string;
}
declare const UpdateEmployeeDto_base: import("@nestjs/common").Type<Partial<CreateEmployeeDto>>;
export declare class UpdateEmployeeDto extends UpdateEmployeeDto_base {
}
export declare class RecordAttendanceDto {
    employeeId: string;
    branchId: string;
    date: string;
    checkIn?: string;
    checkOut?: string;
    status?: AttendanceStatus;
    notes?: string;
}
export declare class CreateLeaveRequestDto {
    employeeId: string;
    startDate: string;
    endDate: string;
    reason: string;
}
export declare class UpdateLeaveStatusDto {
    status: LeaveStatus;
}
export declare class CreatePayrollDto {
    employeeId: string;
    month: number;
    year: number;
    baseSalary: number;
    bonuses?: number;
    deductions?: number;
}
export {};
