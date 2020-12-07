import { AnneeUniversitairesModel } from './annee-universitaires.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class AnneeUniversitairesService extends BaseService<
  AnneeUniversitairesModel
> {
  constructor(
    @InjectModel('AnneeUniversitaires')
    private readonly model: Model<AnneeUniversitairesModel>,
  ) {
    super(model);
  }
}
