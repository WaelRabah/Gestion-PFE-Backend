import { ApiTags } from '@nestjs/swagger';
import { PfesService } from './pfes.service';
import { PfesModel } from './pfes.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';

@ApiTags('pfes')
@Controller('pfes')
export class PfesController extends BaseController<PfesModel> {
  constructor(service: PfesService) {
    super(service);
  }
}
