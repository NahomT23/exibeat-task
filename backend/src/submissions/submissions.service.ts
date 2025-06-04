import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, Submission } from './schemas/Submissions.schema';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { CreateMessageDto } from './dto/create.message.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto): Promise<{ submissionId: string }> {
    const submissionData: Partial<Submission> = {
      ...createSubmissionDto,
      hasInitialMessage: !!createSubmissionDto.initialMessage,
      unreadProducerMessage: !!createSubmissionDto.initialMessage,
    };

    if (createSubmissionDto.initialMessage) {
      submissionData.messages = [{
        senderId: createSubmissionDto.producerId,
        text: createSubmissionDto.initialMessage,
      } as Message];
    }

    const createdSubmission = await this.submissionModel.create(submissionData);
    return { submissionId: createdSubmission.submissionId };
  }

  async findByDjId(djId: string): Promise<any[]> {
    return this.submissionModel.find(
      { djId },
      {
        _id: 0,
        submissionId: 1,
        trackTitle: 1,
        hasInitialMessage: 1,
        unreadProducerMessage: 1,
        djReplied: 1,
      }
    ).exec();
  }

  async findByProducerId(producerId: string): Promise<any[]> {
    return this.submissionModel.find(
      { producerId },
      {
        _id: 0,
        submissionId: 1,
        trackTitle: 1,
        djReplied: 1,
        unreadDjReply: 1,
      }
    ).exec();
  }

  async getMessages(submissionId: string, viewerId: string): Promise<any> {
    const submission = await this.submissionModel.findOne({ submissionId }).exec();
    if (!submission) {
      throw new BadRequestException('Submission not found');
    }

    // Update read statuses
    if (viewerId === submission.djId && submission.unreadProducerMessage) {
      submission.unreadProducerMessage = false;
      await submission.save();
    } else if (viewerId === submission.producerId && submission.unreadDjReply) {
      submission.unreadDjReply = false;
      await submission.save();
    }

    return {
      submissionId: submission.submissionId,
      producerId: submission.producerId,
      djId: submission.djId,
      trackTitle: submission.trackTitle,
      messages: submission.messages,
      hasInitialMessage: submission.hasInitialMessage,
      djReplied: submission.djReplied,
    };
  }

async addMessage(
  submissionId: string,
  createMessageDto: CreateMessageDto
): Promise<{ messageId: string }> {
  const submission = await this.submissionModel.findOne({ submissionId }).exec();
  if (!submission) {
    throw new BadRequestException('Submission not found');
  }

  if (createMessageDto.senderId === submission.producerId) {
    throw new ForbiddenException('Producers can only send initial messages during submission');
  }

  if (createMessageDto.senderId === submission.djId && submission.djReplied) {
    throw new BadRequestException('DJ can only send one feedback per submission');
  }

  // Create new message with current timestamp
  const newMessage = {
    senderId: createMessageDto.senderId,
    text: createMessageDto.text,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Use Mongoose's atomic update to push the message
  const update: any = {
    $push: { messages: newMessage }
  };

  if (createMessageDto.senderId === submission.djId) {
    update.$set = {
      djReplied: true,
      unreadDjReply: true
    };
  }

  await this.submissionModel.updateOne(
    { submissionId },
    update
  );

  return { messageId: new Types.ObjectId().toString() };
}
}