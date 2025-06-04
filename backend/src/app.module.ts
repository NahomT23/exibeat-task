import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubmissionsModule } from './submissions/submissions.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    SubmissionsModule,
  ],
})
export class AppModule {}