import { AnneeUniversitairesSchema } from './annee-universitaires.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnneeUniversitairesController } from './annee-universitaires.controller';
import { AnneeUniversitairesService } from './annee-universitaires.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AnneeUniversitaires', schema: AnneeUniversitairesSchema },
    ]),
  ],
  controllers: [AnneeUniversitairesController],
  providers: [AnneeUniversitairesService],
})
export class AnneeUniversitairesModule {}
