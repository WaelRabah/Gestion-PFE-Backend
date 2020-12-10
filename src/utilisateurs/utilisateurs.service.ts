import { IBaseService } from './../base/Ibase.service';
import { UtilisateursModel } from './utilisateurs.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadGatewayException } from '@nestjs/common';

@Injectable()
export class UtilisateursService implements IBaseService<UtilisateursModel> {
  constructor(
    @InjectModel('Utilisateurs')
    private readonly _model: Model<UtilisateursModel>,
  ) {}

  async create(doc: UtilisateursModel): Promise<UtilisateursModel> {
    try {
      const newDoc = new this._model(doc);
      return await newDoc.save();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<UtilisateursModel[]> {
    try {
      return await this._model.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<UtilisateursModel> {
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
    newDoc: UtilisateursModel,
  ): Promise<UtilisateursModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc);
  }
}
