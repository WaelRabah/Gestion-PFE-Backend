import { AdministrateursModel } from './administrateurs.model';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdministrateursService extends BaseService<AdministrateursModel> {
  constructor(
    @InjectModel('Administrateurs')
    private readonly model: Model<AdministrateursModel>,
  ) {
    super(model);
  }
}
