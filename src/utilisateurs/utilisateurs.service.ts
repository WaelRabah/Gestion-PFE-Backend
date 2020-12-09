import { BaseService } from './../base/base.service';
import { UtilisateursModel } from './utilisateurs.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

@Injectable()
export class UtilisateursService<
  T extends UtilisateursModel
> extends BaseService<T> {
  constructor(
    @InjectModel('Utilisateurs')
    private readonly model: Model<T>,
  ) {
    super(model);
  }
}
