import { Module } from '@nestjs/common';
import { SuggestPfeController } from './suggest-pfe.controller';
import { SuggestPfeService } from './suggest-pfe.service';

@Module({
  controllers: [SuggestPfeController],
  providers: [SuggestPfeService]
})
export class SuggestPfeModule {}
