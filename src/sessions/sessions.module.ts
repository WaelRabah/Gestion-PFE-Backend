import { SessionsSchema } from './sessions.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sessions', schema: SessionsSchema }]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
