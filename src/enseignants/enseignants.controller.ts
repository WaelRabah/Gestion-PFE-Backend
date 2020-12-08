import { EnseignantsModel } from './enseignants.model';
import { EnseignantsService } from './enseignants.service';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';

@Controller('enseignants')
export class EnseignantsController extends BaseController<EnseignantsModel> {
  constructor(service: EnseignantsService) {
    super(service);
  }
}
