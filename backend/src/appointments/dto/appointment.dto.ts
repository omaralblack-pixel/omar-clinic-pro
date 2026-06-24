import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';
import { AppointmentStatus, ReminderChannel } from '@prisma/client';

export class CreateAppointmentDto {
  @ApiProperty() @IsString() branchId: string;
  @ApiProperty() @IsString() patientId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() doctorId?: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty() @IsDateString() scheduledAt: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(5) duration?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}

export class UpdateAppointmentStatusDto {
  @ApiProperty({ enum: AppointmentStatus })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}

export class CreateReminderDto {
  @ApiProperty({ enum: ReminderChannel })
  @IsEnum(ReminderChannel)
  channel: ReminderChannel;

  @ApiProperty() @IsDateString() scheduledAt: string;
}

export class CalendarQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsString() branchId?: string;
  @ApiProperty() @IsDateString() date: string;
}
