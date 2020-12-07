import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilisateursController } from './utilisateurs.controller';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursSchema } from './utilisateurs.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Utilisateurs', schema: UtilisateursSchema },
    ]),
  ],
  controllers: [UtilisateursController],
  providers: [UtilisateursService],
})
export class UtilisateursModule {}
