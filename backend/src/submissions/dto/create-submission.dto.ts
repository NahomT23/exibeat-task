import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubmissionDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  producerId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  djId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trackTitle: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  trackDescription?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  initialMessage?: string;
}
