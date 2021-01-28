import { SoutenancesSchema } from './soutenances.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoutenancesController } from './soutenances.controller';
import { SoutenancesService } from './soutenances.service';
import { UtilisateursModule } from 'src/utilisateurs/utilisateurs.module';
import { PfesModule } from 'src/pfes/pfes.module';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Soutenances', schema: SoutenancesSchema },
    ]),
    UtilisateursModule,
    PfesModule,
    SessionsModule
  ],
  controllers: [SoutenancesController],
  providers: [SoutenancesService],
})
export class SoutenancesModule {}
