import { PfesModel } from './pfes.model';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PfesService extends BaseService<PfesModel> {
  constructor(
    @InjectModel('Pfes')
    private readonly model: Model<PfesModel>,
  ) {
    super(model);
  }
}
