import { AdministrateursSchema } from './administrateurs.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministrateursController } from './administrateurs.controller';
import { AdministrateursService } from './administrateurs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Administrateurs', schema: AdministrateursSchema },
    ]),
  ],
  controllers: [AdministrateursController],
  providers: [AdministrateursService],
})
export class AdministrateursModule {}
