import { SuggestPfeSchema } from './suggest-pfe.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestPfeController } from './suggest-pfe.controller';
import { SuggestPfeService } from './suggest-pfe.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Suggestions', schema: SuggestPfeSchema },
    ]),
  ],
  controllers: [SuggestPfeController],
  providers: [SuggestPfeService],
})
export class SuggestPfeModule {}
