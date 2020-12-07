import { EtudiantsModule } from './etudiants/etudiants.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnseignantsModule } from './enseignants/enseignants.module';
import { AdministrateursModule } from './administrateurs/administrateurs.module';
import { PfesModule } from './pfes/pfes.module';
import { SessionsModule } from './sessions/sessions.module';
import { SoutenancesModule } from './soutenances/soutenances.module';
import { AnneeUniversitairesModule } from './annee-universitaires/annee-universitaires.module';
import { SuggestPfeModule } from './suggest-pfe/suggest-pfe.module';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
require('dotenv').config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, { useFindAndModify: false }),
    EnseignantsModule,
    EtudiantsModule,
    AdministrateursModule,
    PfesModule,
    SessionsModule,
    SoutenancesModule,
    AnneeUniversitairesModule,
    SuggestPfeModule,
    UtilisateursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
