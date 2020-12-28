import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBaseService } from '../base/Ibase.service';
import { Model } from 'mongoose';
import { SuggestPfeModel } from './suggest-pfe.model';
import { InjectModel } from '@nestjs/mongoose';
import CreateSuggestPfeDto from './dtos/create-suggest-pfe.dto';
import UpdateSuggestPfeDto from './dtos/update-suggest-pfe.dto';
import { Status } from '../enums/status.enum';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import SearchPfeSuggestionDTO from './dtos/search-pfe-suggestion.dto';
import StatusChangeDTO from './dtos/status-change.dto';
@Injectable()
export class SuggestPfeService implements IBaseService<SuggestPfeModel> {
  constructor(
    @InjectModel('Suggestions') private readonly _model: Model<SuggestPfeModel>,
  ) {}

  async create(doc: CreateSuggestPfeDto,filepath: string, status: Status, enseignant: UtilisateursModel): Promise<SuggestPfeModel> {
    try {
      const newDoc = new this._model({...doc,filepath,status,enseignantId:enseignant.id});
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

  async update(
    id: string,
    newDoc: UpdateSuggestPfeDto,
  ): Promise<SuggestPfeModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc);
  }

  async changeStatus(id: string, newDoc: StatusChangeDTO): Promise<SuggestPfeModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc);
  }

  find(query: SearchPfeSuggestionDTO) : Promise<SuggestPfeModel[]> {
    return  this._model.find(query).exec();
  }
}
