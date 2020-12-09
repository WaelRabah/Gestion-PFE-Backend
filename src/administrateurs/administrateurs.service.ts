import { UtilisateursService } from './../utilisateurs/utilisateurs.service';
import { AdministrateursModel } from './administrateurs.model';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdministrateursService extends UtilisateursService<
  AdministrateursModel
> {
  constructor(
    @InjectModel('Administrateurs')
    private readonly __model: Model<AdministrateursModel>,
  ) {
    super(__model);
  }
}
