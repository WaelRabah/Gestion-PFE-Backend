import { SoutenancesSchema } from './soutenances.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoutenancesController } from './soutenances.controller';
import { SoutenancesService } from './soutenances.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Soutenances', schema: SoutenancesSchema },
    ]),
  ],
  controllers: [SoutenancesController],
  providers: [SoutenancesService],
})
export class SoutenancesModule {}
