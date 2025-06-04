import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { CreateMessageDto } from './dto/create.message.dto';

@Controller('/submissions')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  async createSubmission(@Body() dto: CreateSubmissionDto) {
    return this.submissionsService.create(dto);
  }

  @Get('/dj/:djId')
  async getSubmissionsForDj(@Param('djId') djId: string) {
    return this.submissionsService.findByDjId(djId);
  }

  @Get('/producer/:producerId')
  async getSubmissionsForProducer(@Param('producerId') producerId: string) {
    return this.submissionsService.findByProducerId(producerId);
  }

  @Get('/:submissionId/messages')
  async getMessages(
    @Param('submissionId') submissionId: string,
    @Query('viewerId') viewerId: string,
  ) {
    if (!viewerId) throw new BadRequestException('Viewer ID is required');
    return this.submissionsService.getMessages(submissionId, viewerId);
  }

  @Post('/:submissionId/messages')
  async postMessage(
    @Param('submissionId') submissionId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.submissionsService.addMessage(submissionId, dto);
  }
}