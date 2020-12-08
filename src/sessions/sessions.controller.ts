import { SessionsService } from './sessions.service';
import { SessionsModel } from './sessions.model';
import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';

@Controller('sessions')
export class SessionsController extends BaseController<SessionsModel> {
  constructor(service: SessionsService) {
    super(service);
  }
}
