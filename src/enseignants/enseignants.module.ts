import { EnseignantsSchema } from './enseignants.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnseignantsController } from './enseignants.controller';
import { EnseignantsService } from './enseignants.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Enseignants', schema: EnseignantsSchema },
    ]),
  ],
  controllers: [EnseignantsController],
  providers: [EnseignantsService],
})
export class EnseignantsModule {}
