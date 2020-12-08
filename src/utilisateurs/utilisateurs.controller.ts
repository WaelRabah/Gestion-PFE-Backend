import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursModel } from './utilisateurs.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';

@Controller('utilisateurs')
export class UtilisateursController extends BaseController<UtilisateursModel> {
  constructor(service: UtilisateursService) {
    super(service);
  }
}
