import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { PfesModule } from './pfes/pfes.module';
import { SessionsModule } from './sessions/sessions.module';
import { SoutenancesModule } from './soutenances/soutenances.module';
import { AnneeUniversitairesModule } from './annee-universitaires/annee-universitaires.module';
import { SuggestPfeModule } from './suggest-pfe/suggest-pfe.module';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, { useFindAndModify: false }),
    PfesModule,
    SessionsModule,
    SoutenancesModule,
    AnneeUniversitairesModule,
    SuggestPfeModule,
    UtilisateursModule,
    AuthModule,
    MulterModule.register({})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
