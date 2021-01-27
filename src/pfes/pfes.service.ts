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
  constructor(@InjectModel('Pfes') private readonly _model: Model<PfesModel>) { }

  async create(doc: CreatePfesDto, filepath: string, status: Status, etudiant: UtilisateursModel): Promise<PfesModel> {
    try {
      const newDoc = new this._model({ ...doc, filepath, status, studentId: etudiant.id });
      return await newDoc.save();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<PfesModel[]> {
    try {
      const pfes=await this._model.find();
      const results=pfes.map((pfe : PfesModel)=>{
        const result =pfe
        .populate('student')
        .populate('soutenance')
        .execPopulate()
        return result
      })
      return Promise.all(results)
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAllUnassigned(): Promise<PfesModel[]> {
    try {
      const pfes = await this._model.find({ soutenanceId: undefined });

      const results=pfes.map((pfe : PfesModel)=>{
        const result =pfe
        .populate('student')
        .populate('soutenance')
        .execPopulate()
        return result
      })
      return Promise.all(results)
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<PfesModel> {
    const doc = await this._model.findById(id);
    const result = await doc
    .populate('student')
    .populate('soutenance')
    .execPopulate()
    if (!doc) throw new NotFoundException('Doc not found');

    return result;
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

 async find(query: SearchPfeDTO): Promise<PfesModel[]> {
   const pfes = await this._model.find(query).exec()
   const results = pfes.map((pfe)=>{
    const result = pfe
    .populate('student')
    .populate('soutenance')
    .execPopulate()
    return result
  })
    return Promise.all(results);
  }

  async uploadRapport(rapportFilepath: string,etudiant:UtilisateursModel){
    const pfe = await this._model.findOne({studentId:etudiant.id}).exec();
    pfe.rapportFilepath=rapportFilepath;
    return pfe.save();
  }

}
