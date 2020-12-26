import { PfesSchema } from './pfes.model';
import { Module } from '@nestjs/common';
import { PfesController } from './pfes.controller';
import { PfesService } from './pfes.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pfes', schema: PfesSchema }])],
  controllers: [PfesController],
  providers: [PfesService],
  exports : [PfesService]
})
export class PfesModule {}
