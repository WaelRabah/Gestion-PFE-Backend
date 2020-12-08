import { BadGatewayException, Injectable } from '@nestjs/common';
import { IBaseService } from './Ibase.service';
import { Model, Document } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> implements IBaseService<T> {
  constructor(private readonly _model: Model<T>) {}

  async create(doc: T): Promise<T> {
    try {
      const newDoc = new this._model(doc);
      return await newDoc.save();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return await this._model.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<T> {
    try {
    } catch (error) {
      throw new BadGatewayException(error);
    }
    return await this._model.findById(id);
  }

  async delete(id: string): Promise<void> {
    try {
      await this._model.findByIdAndDelete(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async update(id: string, doc: T): Promise<T> {
    try {
      return await this._model.findByIdAndUpdate(id, doc);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
