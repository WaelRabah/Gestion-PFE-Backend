import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBaseService } from '../base/Ibase.service';
import { Model } from 'mongoose';
import { SuggestPfeModel } from './suggest-pfe.model';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class SuggestPfeService implements IBaseService<SuggestPfeModel> {
  constructor(
    @InjectModel('Suggestions') private readonly _model: Model<SuggestPfeModel>,
  ) {}

  async create(doc: SuggestPfeModel): Promise<SuggestPfeModel> {
    try {
      const newDoc = new this._model(doc);
      return await newDoc.save();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<SuggestPfeModel[]> {
    try {
      return await this._model.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<SuggestPfeModel> {
    const doc = await this._model.findById(id);
    if (!doc) throw new NotFoundException('Doc not found');

    return await this._model.findById(id);
  }

  async delete(id: string): Promise<void> {
    const doc = await this._model.findById(id);
    if (!doc) throw new NotFoundException('Doc not found');
    await this._model.findByIdAndDelete(id);
  }

  async update(id: string, newDoc: SuggestPfeModel): Promise<SuggestPfeModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc);
  }
}
