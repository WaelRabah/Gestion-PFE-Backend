import { UtilisateursController } from './../utilisateurs/utilisateurs.controller';
import { AdministrateursService } from './administrateurs.service';
import { AdministrateursModel } from './administrateurs.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';

@Controller('administrateurs')
export class AdministrateursController extends UtilisateursController<
  AdministrateursModel
> {
  constructor(private readonly service: AdministrateursService) {
    super(service);
  }
}
