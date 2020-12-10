import { ApiTags } from '@nestjs/swagger';
import { SoutenancesService } from './soutenances.service';
import { SoutenancesModel } from './soutenances.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
@ApiTags('soutenances')
@Controller('soutenances')
export class SoutenancesController extends BaseController<SoutenancesModel> {
  constructor(service: SoutenancesService) {
    super(service);
  }
}
