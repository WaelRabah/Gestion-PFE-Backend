import { ApiTags } from '@nestjs/swagger';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursModel } from './utilisateurs.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
@ApiTags('utilisateurs')
@Controller('utilisateurs')
export class UtilisateursController<
  T extends UtilisateursModel
> extends BaseController<T> {
  constructor(private readonly __service: UtilisateursService<T>) {
    super(__service);
  }
}
