import { UtilisateursService } from './../utilisateurs/utilisateurs.service';
import { EtudiantsModel } from './etudiants.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class EtudiantsService extends UtilisateursService<EtudiantsModel> {
  constructor(
    @InjectModel('Etudiants')
    private readonly __model: Model<EtudiantsModel>,
  ) {
    super(__model);
  }
}
