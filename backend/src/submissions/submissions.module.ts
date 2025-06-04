import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from './schemas/Submissions.schema';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Submission.name,
      schema: SubmissionSchema
    }]),
    ThrottlerModule, // Import ThrottlerModule here
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService]
})
export class SubmissionsModule {}