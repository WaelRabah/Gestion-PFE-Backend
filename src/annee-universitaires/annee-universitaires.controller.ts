import { AnneeUniversitairesModel } from './annee-universitaires.model';
import { AnneeUniversitairesService } from './annee-universitaires.service';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';

@Controller('annee-universitaires')
export class AnneeUniversitairesController extends BaseController<
  AnneeUniversitairesModel
> {
  constructor(service: AnneeUniversitairesService) {
    super(service);
  }
}
