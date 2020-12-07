import { Module } from '@nestjs/common';
import { AnneeUniController } from './annee-uni.controller';
import { AnneeUniService } from './annee-uni.service';

@Module({
  controllers: [AnneeUniController],
  providers: [AnneeUniService]
})
export class AnneeUniModule {}
