import { ApiTags } from '@nestjs/swagger';
import { UtilisateursController } from './../utilisateurs/utilisateurs.controller';
import { EtudiantsService } from './etudiants.service';
import { EtudiantsModel } from './etudiants.model';
import { Controller } from '@nestjs/common';
@ApiTags('etudiants')
@Controller('etudiants')
export class EtudiantsController extends UtilisateursController<
  EtudiantsModel
> {
  constructor(private readonly service: EtudiantsService) {
    super(service);
  }
}
