import { UtilisateursService } from './../utilisateurs/utilisateurs.service';
import { EnseignantsModel } from './enseignants.model';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EnseignantsService extends UtilisateursService<EnseignantsModel> {
  constructor(
    @InjectModel('Enseignants')
    private readonly __model: Model<EnseignantsModel>,
  ) {
    super(__model);
  }
}
