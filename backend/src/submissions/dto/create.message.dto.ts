import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



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
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;
}
