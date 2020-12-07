import { AdministrateursService } from './administrateurs.service';
import { AdministrateursModel } from './administrateurs.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';

@Controller('administrateurs')
export class AdministrateursController extends BaseController<
  AdministrateursModel
> {
  constructor(service: AdministrateursService) {
    super(service);
  }
}
