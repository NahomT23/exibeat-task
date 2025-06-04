import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateSubmissionDto {
  @IsUUID()
  @IsNotEmpty()
  producerId: string;

  @IsUUID()
  @IsNotEmpty()
  djId: string;

  @IsString()
  @IsNotEmpty()
  trackTitle: string;

  @IsString()
  @IsOptional()
  trackDescription?: string;

  @IsString()
  @IsOptional()
  initialMessage?: string;
}
export class CreateMessageDto {
  senderId: string;
  text: string;
}