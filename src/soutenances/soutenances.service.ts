import { SoutenancesModel } from './soutenances.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class SoutenancesService extends BaseService<SoutenancesModel> {
  constructor(
    @InjectModel('Soutenances')
    private readonly model: Model<SoutenancesModel>,
  ) {
    super(model);
  }
}
