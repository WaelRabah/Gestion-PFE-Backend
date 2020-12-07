import { Module } from '@nestjs/common';
import { PfeController } from './pfe.controller';
import { PfeService } from './pfe.service';

@Module({
  controllers: [PfeController],
  providers: [PfeService]
})
export class PfeModule {}
