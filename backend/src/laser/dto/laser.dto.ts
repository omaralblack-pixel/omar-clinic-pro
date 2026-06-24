import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';
import { DocumentType, LaserAreaPreset } from '@prisma/client';

export class CreateLaserAreaDto {
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() nameAr?: string;
  @ApiPropertyOptional({ enum: LaserAreaPreset })
  @IsOptional()
  @IsEnum(LaserAreaPreset)
  preset?: LaserAreaPreset;
}

export class UpdateLaserAreaDto extends PartialType(CreateLaserAreaDto) {}

export class CreateLaserSessionDto {
  @ApiProperty() @IsString() branchId: string;
  @ApiProperty() @IsString() patientId: string;
  @ApiProperty() @IsString() areaId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() specialistId?: string;
  @ApiProperty() @IsInt() @Min(1) sessionNumber: number;
  @ApiProperty() @IsDateString() sessionDate: string;
  @ApiPropertyOptional() @IsOptional() @IsString() device?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() energyLevel?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() pulseWidth?: string;
  @ApiPropertyOptional() @IsOptional() notes?: string;
}

export class UpdateLaserSessionDto extends PartialType(CreateLaserSessionDto) {}

export class AddSessionPhotoDto {
  @ApiProperty({ enum: DocumentType })
  @IsEnum(DocumentType)
  type: DocumentType;

  @ApiProperty() @IsString() fileUrl: string;
  @ApiProperty() @IsString() fileName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
