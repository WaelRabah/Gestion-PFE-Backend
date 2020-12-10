import { ApiTags } from '@nestjs/swagger';
import { SuggestPfeService } from './suggest-pfe.service';
import { SuggestPfeModel } from './suggest-pfe.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
@ApiTags('suggest-pfe')
@Controller('suggest-pfe')
export class SuggestPfeController extends BaseController<SuggestPfeModel> {
  constructor(service: SuggestPfeService) {
    super(service);
  }
}
