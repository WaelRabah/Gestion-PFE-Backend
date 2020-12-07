import { SuggestPfeModel } from './suggest-pfe.model';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';

@Injectable()
export class SuggestPfeService extends BaseService<SuggestPfeModel> {
  constructor(
    @InjectModel('Suggestions')
    private readonly model: Model<SuggestPfeModel>,
  ) {
    super(model);
  }
}
