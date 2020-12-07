import { BaseService } from './../base/base.service';
import { UtilisateursModel } from './utilisateurs.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UtilisateursService extends BaseService<UtilisateursModel> {
  constructor(
    @InjectModel('Utilisateurs')
    private readonly model: Model<UtilisateursModel>,
  ) {
    super(model);
  }
}
