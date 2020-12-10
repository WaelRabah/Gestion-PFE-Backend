import { ApiTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { SessionsModel } from './sessions.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
@ApiTags('sessions')
@Controller('sessions')
export class SessionsController extends BaseController<SessionsModel> {
  constructor(service: SessionsService) {
    super(service);
  }
}
