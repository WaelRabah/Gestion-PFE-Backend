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
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import { Status } from '../enums/status.enum';
import SearchPfeDTO from './dtos/search-pfe.dto';
import StatusChangeDTO from './dtos/status-change.dto';
@Injectable()
export class PfesService implements IBaseService<PfesModel> {
  constructor(@InjectModel('Pfes') private readonly _model: Model<PfesModel>) {}

  async create(doc: CreatePfesDto,filepath: string, status: Status, etudiant: UtilisateursModel): Promise<PfesModel> {
    try {
      const newDoc = new this._model({...doc,filepath,status,studentId:etudiant.id});
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

  async changeStatus(id: string, newDoc: StatusChangeDTO): Promise<PfesModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc);
  }

  find(query: SearchPfeDTO) : Promise<PfesModel[]> {
    return  this._model.find(query).exec();
  }

  async uploadRapport(rapportFilepath: string,etudiant:UtilisateursModel){
    const pfe = await this._model.findOne({studentId:etudiant.id}).exec();
    pfe.rapportFilepath=rapportFilepath;
    return pfe.save();
  }
}
