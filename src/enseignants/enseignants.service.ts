import { EnseignantsModel } from './enseignants.model';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EnseignantsService extends BaseService<EnseignantsModel> {
  constructor(
    @InjectModel('Enseignants')
    private readonly model: Model<EnseignantsModel>,
  ) {
    super(model);
  }
}
