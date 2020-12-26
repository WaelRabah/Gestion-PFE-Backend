import { InjectModel } from '@nestjs/mongoose';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBaseService } from '../base/Ibase.service';
import { Model } from 'mongoose';
import { PfesModel } from './pfes.model';
import CreatePfesDto from './dtos/create-pfes.dto';
import UpdatePfesDto from './dtos/update-pfes.dto';
@Injectable()
export class PfesService implements IBaseService<PfesModel> {
  constructor(@InjectModel('Pfes') private readonly _model: Model<PfesModel>) {}

  async create(doc: CreatePfesDto): Promise<PfesModel> {
    try {
      const newDoc = new this._model(doc);
      return await newDoc.save();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<PfesModel[]> {
    try {
      return await this._model.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAllUnassigned(): Promise<PfesModel[]> {
    try {
      return await this._model.find({soutenanceId : undefined});
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<PfesModel> {
    const doc = await this._model.findById(id);
    if (!doc) throw new NotFoundException('Doc not found');

    return await this._model.findById(id);
  }

  async delete(id: string): Promise<void> {
    const doc = await this._model.findById(id);
    if (!doc) throw new NotFoundException('Doc not found');
    await this._model.findByIdAndDelete(id);
  }

  async update(id: string, newDoc: UpdatePfesDto): Promise<PfesModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc);
  }
}
