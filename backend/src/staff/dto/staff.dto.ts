import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { AttendanceStatus, LeaveStatus } from '@prisma/client';

export class CreateEmployeeDto {
  @ApiProperty() @IsString() userId: string;
  @ApiProperty() @IsString() branchId: string;
  @ApiProperty() @IsString() employeeNo: string;
  @ApiPropertyOptional() @IsOptional() @IsString() department?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() jobTitle?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) salary?: number;
  @ApiProperty() @IsDateString() hireDate: string;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export class RecordAttendanceDto {
  @ApiProperty() @IsString() employeeId: string;
  @ApiProperty() @IsString() branchId: string;
  @ApiProperty() @IsDateString() date: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() checkIn?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() checkOut?: string;
  @ApiPropertyOptional({ enum: AttendanceStatus })
  @IsOptional()
  @IsEnum(AttendanceStatus)
  status?: AttendanceStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class CreateLeaveRequestDto {
  @ApiProperty() @IsString() employeeId: string;
  @ApiProperty() @IsDateString() startDate: string;
  @ApiProperty() @IsDateString() endDate: string;
  @ApiProperty() @IsString() reason: string;
}

export class UpdateLeaveStatusDto {
  @ApiProperty({ enum: LeaveStatus }) @IsEnum(LeaveStatus) status: LeaveStatus;
}

export class CreatePayrollDto {
  @ApiProperty() @IsString() employeeId: string;
  @ApiProperty() @IsInt() @Min(1) @Max(12) month: number;
  @ApiProperty() @IsInt() @Min(2000) year: number;
  @ApiProperty() @IsNumber() @Min(0) baseSalary: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) bonuses?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) deductions?: number;
}
