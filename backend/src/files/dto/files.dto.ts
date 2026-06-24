import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UploadQueryDto {
  @ApiPropertyOptional({ description: 'Subfolder under uploads directory' })
  @IsOptional()
  @IsString()
  folder?: string;
}
