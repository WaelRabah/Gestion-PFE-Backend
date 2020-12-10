import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBaseService } from '../base/Ibase.service';
import { Model } from 'mongoose';
import { SessionsModel } from './sessions.model';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class SessionsService implements IBaseService<SessionsModel> {
  constructor(
    @InjectModel('Sessions') private readonly _model: Model<SessionsModel>,
  ) {}

  async create(doc: SessionsModel): Promise<SessionsModel> {
    try {
      const newDoc = new this._model(doc);
      return await newDoc.save();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<SessionsModel[]> {
    try {
      return await this._model.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<SessionsModel> {
    const doc = await this._model.findById(id);

    if (!doc) throw new NotFoundException('Document not found');

    return await this._model.findById(id);
  }

  async delete(id: string): Promise<void> {
    const doc = await this._model.findById(id);
    if (!doc) throw new NotFoundException('Document not found');

    await this._model.findByIdAndDelete(id);
  }

  async update(id: string, newDoc: SessionsModel): Promise<SessionsModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc);
  }
}
