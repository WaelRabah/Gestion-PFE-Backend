import { SessionsModel } from './sessions.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class SessionsService extends BaseService<SessionsModel> {
  constructor(
    @InjectModel('Sessions')
    private readonly model: Model<SessionsModel>,
  ) {
    super(model);
  }
}
