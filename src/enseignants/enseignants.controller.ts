import { UtilisateursController } from './../utilisateurs/utilisateurs.controller';
import { EnseignantsModel } from './enseignants.model';
import { EnseignantsService } from './enseignants.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('enseignants')
@Controller('enseignants')
export class EnseignantsController extends UtilisateursController<
  EnseignantsModel
> {
  constructor(private readonly service: EnseignantsService) {
    super(service);
  }
}
