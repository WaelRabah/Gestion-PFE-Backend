import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnseignantsModule } from './enseignants/enseignants.module';
import { AdministrateurModule } from './administrateur/administrateur.module';
import { PfeModule } from './pfe/pfe.module';
import { SessionModule } from './session/session.module';
import { SoutenanceModule } from './soutenance/soutenance.module';
import { AnneeUniModule } from './annee-uni/annee-uni.module';
import { SuggestPfeModule } from './suggest-pfe/suggest-pfe.module';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { BaseModule } from './base/base.module';
require('dotenv').config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    EnseignantsModule,
    AdministrateurModule,
    PfeModule,
    SessionModule,
    SoutenanceModule,
    AnneeUniModule,
    SuggestPfeModule,
    UtilisateursModule,
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
