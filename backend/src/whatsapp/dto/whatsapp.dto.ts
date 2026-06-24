import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { WhatsAppMessageType } from '@prisma/client';

export class SendMessageDto {
  @ApiProperty() @IsString() phone: string;
  @ApiProperty() @IsString() message: string;
  @ApiPropertyOptional({ enum: WhatsAppMessageType })
  @IsOptional()
  @IsEnum(WhatsAppMessageType)
  type?: WhatsAppMessageType;
}

export class SendAppointmentReminderDto {
  @ApiProperty() @IsString() appointmentId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() customMessage?: string;
}
