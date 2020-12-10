import { UtilisateursController } from './../utilisateurs/utilisateurs.controller';
import { AdministrateursService } from './administrateurs.service';
import { AdministrateursModel } from './administrateurs.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('administrateurs')
@Controller('administrateurs')
export class AdministrateursController extends UtilisateursController<
  AdministrateursModel
> {
  constructor(private readonly service: AdministrateursService) {
    super(service);
  }
}
