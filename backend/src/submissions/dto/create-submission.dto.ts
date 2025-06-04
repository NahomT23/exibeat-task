import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSubmissionDto {
  @IsNotEmpty()
  @IsString()
  producerId: string;

  @IsNotEmpty()
  @IsString()
  djId: string;

  @IsNotEmpty()
  @IsString()
  trackTitle: string;

  @IsOptional()
  @IsString()
  trackDescription?: string;

  @IsOptional()
  @IsString()
  initialMessage?: string;
}