import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ _id: false, timestamps: true })
export class Message {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  text: string;

  // Explicitly declare timestamps to avoid validation issues
  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Rest of the Submission schema remains the same
@Schema({ timestamps: true })
export class Submission extends Document {
  @Prop({ required: true, unique: true, default: () => new Types.ObjectId().toString() })
  submissionId: string;

  @Prop({ required: true })
  producerId: string;

  @Prop({ required: true })
  djId: string;

  @Prop({ required: true })
  trackTitle: string;

  @Prop()
  trackDescription?: string;

  @Prop({ type: [MessageSchema], default: [] })
  messages: Message[];

  @Prop({ default: false })
  hasInitialMessage: boolean;

  @Prop({ default: false })
  djReplied: boolean;

  @Prop({ default: false })
  unreadProducerMessage: boolean;

  @Prop({ default: false })
  unreadDjReply: boolean;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);