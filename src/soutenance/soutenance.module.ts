import { Module } from '@nestjs/common';
import { SoutenanceController } from './soutenance.controller';
import { SoutenanceService } from './soutenance.service';

@Module({
  controllers: [SoutenanceController],
  providers: [SoutenanceService]
})
export class SoutenanceModule {}
