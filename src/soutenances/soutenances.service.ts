import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBaseService } from '../base/Ibase.service';
import { Model } from 'mongoose';
import { SoutenancesModel } from './soutenances.model';
import { InjectModel } from '@nestjs/mongoose';
import UpdateSoutenancesDto from './dtos/update-soutenances.dto';
import CreateSoutenancesDto from './dtos/create-soutenances.dto';
@Injectable()
export class SoutenancesService implements IBaseService<SoutenancesModel> {
  constructor(
    @InjectModel('Soutenances')
    private readonly _model: Model<SoutenancesModel>,
  ) {}

  async create(doc: CreateSoutenancesDto): Promise<SoutenancesModel> {
    try {
      const newDoc = new this._model(doc);
      return await newDoc.save();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<SoutenancesModel[]> {
    try {
      return await this._model.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<SoutenancesModel> {
    const doc = await this._model.findById(id);
    if (!doc) throw new NotFoundException('Doc not found');

    return await this._model.findById(id);
  }

  async delete(id: string): Promise<void> {
    const doc = await this._model.findById(id);
    if (!doc) throw new NotFoundException('Doc not found');
    await this._model.findByIdAndDelete(id);
  }

  async update(
    id: string,
    newDoc: UpdateSoutenancesDto,
  ): Promise<SoutenancesModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc);
  }
}
