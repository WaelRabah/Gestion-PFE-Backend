import { EtudiantsSchema } from './etudiants.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EtudiantsController } from './etudiants.controller';
import { EtudiantsService } from './etudiants.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Etudiants', schema: EtudiantsSchema }]),
  ],
  controllers: [EtudiantsController],
  providers: [EtudiantsService],
})
export class EtudiantsModule {}
