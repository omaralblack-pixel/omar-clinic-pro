import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  Min,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateServicePackageDto {
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() nameAr?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty() @IsInt() @Min(1) totalSessions: number;
  @ApiProperty() @IsNumber() @Min(0) price: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) validityDays?: number;
}

export class UpdateServicePackageDto extends PartialType(CreateServicePackageDto) {}

export class AssignPatientPackageDto {
  @ApiProperty() @IsString() patientId: string;
  @ApiProperty() @IsString() packageId: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() expirationDate?: string;
}

export class UseSessionDto {
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) sessions?: number;
}

export class UpdatePatientPackageDto {
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsDateString() expirationDate?: string;
}
