import { EtudiantsModel } from './etudiants.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class EtudiantsService extends BaseService<EtudiantsModel> {
  constructor(
    @InjectModel('Etudiants')
    private readonly model: Model<EtudiantsModel>,
  ) {
    super(model);
  }
}
