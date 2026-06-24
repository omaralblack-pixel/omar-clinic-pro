import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
  IsDateString,
} from 'class-validator';
import { CashboxTransactionType } from '@prisma/client';

export class CreateCashboxDto {
  @ApiProperty() @IsString() branchId: string;
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() currency?: string;
}

export class CashboxTransactionDto {
  @ApiProperty({ enum: CashboxTransactionType })
  @IsEnum(CashboxTransactionType)
  type: CashboxTransactionType;

  @ApiProperty() @IsNumber() @Min(0.01) amount: number;
  @ApiProperty() @IsString() description: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reference?: string;
}

export class CreateIncomeDto {
  @ApiProperty() @IsString() branchId: string;
  @ApiProperty() @IsString() category: string;
  @ApiProperty() @IsNumber() @Min(0.01) amount: number;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reference?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() recordedAt?: string;
}

export class CreateExpenseDto {
  @ApiProperty() @IsString() branchId: string;
  @ApiProperty() @IsString() category: string;
  @ApiProperty() @IsNumber() @Min(0.01) amount: number;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reference?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() recordedAt?: string;
}

export class ReportQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsString() branchId?: string;
  @ApiProperty() @IsDateString() from: string;
  @ApiProperty() @IsDateString() to: string;
}
