import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBaseService } from '../base/Ibase.service';
import { Model } from 'mongoose';
import { AnneeUniversitairesModel } from './annee-universitaires.model';
import { InjectModel } from '@nestjs/mongoose';
import CreateAnneeUniversitairesDto from './dtos/create-annee-universitaires.dto';
import UpdateAnneeUniversitairesDto from './dtos/update-annee-universitaires.dto';
@Injectable()
export class AnneeUniversitairesService
  implements IBaseService<AnneeUniversitairesModel> {
  constructor(
    @InjectModel('AnneeUniversitaires')
    private readonly _model: Model<AnneeUniversitairesModel>,
  ) {}

  async create(
    doc: CreateAnneeUniversitairesDto,
  ): Promise<AnneeUniversitairesModel> {
    try {
      const newDoc = new this._model(doc);
      return await newDoc.save();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<AnneeUniversitairesModel[]> {
    try {
      return await this._model.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<AnneeUniversitairesModel> {
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
    newDoc: UpdateAnneeUniversitairesDto,
  ): Promise<AnneeUniversitairesModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc);
  }
}
