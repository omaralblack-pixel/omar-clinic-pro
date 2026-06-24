import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, SkinType, PregnancyStatus } from '@prisma/client';

export class MedicalInfoDto {
  @ApiPropertyOptional() @IsOptional() @IsString() allergies?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() diseases?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() medications?: string;
  @ApiPropertyOptional() @IsOptional() @IsEnum(PregnancyStatus) pregnancyStatus?: PregnancyStatus;
  @ApiPropertyOptional() @IsOptional() @IsEnum(SkinType) skinType?: SkinType;
  @ApiPropertyOptional() @IsOptional() @IsString() medicalNotes?: string;
}

export class CreatePatientDto {
  @ApiProperty() @IsString() branchId: string;
  @ApiProperty() @IsString() firstName: string;
  @ApiProperty() @IsString() lastName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() firstNameAr?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() lastNameAr?: string;
  @ApiProperty({ enum: Gender }) @IsEnum(Gender) gender: Gender;
  @ApiPropertyOptional() @IsOptional() @IsDateString() birthDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() nationalId?: string;
  @ApiProperty() @IsString() phone: string;
  @ApiPropertyOptional() @IsOptional() @IsString() whatsapp?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() address?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() emergencyName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() emergencyPhone?: string;
  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MedicalInfoDto) medicalInfo?: MedicalInfoDto;
}

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
export class UpdateMedicalInfoDto extends MedicalInfoDto {}
