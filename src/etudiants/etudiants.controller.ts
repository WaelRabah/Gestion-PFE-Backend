import { EtudiantsService } from './etudiants.service';
import { EtudiantsModel } from './etudiants.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';

@Controller('etudiants')
export class EtudiantsController extends BaseController<EtudiantsModel> {
  constructor(service: EtudiantsService) {
    super(service);
  }
}
