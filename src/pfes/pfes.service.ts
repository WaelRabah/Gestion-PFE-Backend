import { Status } from 'src/enums/status.enum';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBaseService } from '../base/Ibase.service';
import { Model } from 'mongoose';
import { PfesModel } from './pfes.model';
import CreatePfesDto from './dtos/create-pfes.dto';
import UpdatePfesDto from './dtos/update-pfes.dto';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import SearchPfeDTO from './dtos/search-pfe.dto';
import StatusChangeDTO from './dtos/status-change.dto';
import * as fs from 'fs';
@Injectable()
export class PfesService implements IBaseService<PfesModel> {
  constructor(@InjectModel('Pfes') private readonly _model: Model<PfesModel>) { }

  async create(doc: CreatePfesDto, filepath: string, etudiant: UtilisateursModel): Promise<PfesModel> {
    
    try {
      let sujet: PfesModel = await this._model.findOne({ studentId: etudiant.id });
      if (sujet) {
        if (sujet.status == Status.Refuse) {
          fs.unlinkSync(sujet.filepath);
          return await sujet.updateOne({ ...doc, filepath, status: Status.Attente, studentId: etudiant.id });
        }
        else throw new BadRequestException('Votre sujet est en attente ou a été déjà accepté');
      }
      else {
        sujet = new this._model({ ...doc, filepath, status: Status.Attente, studentId: etudiant.id });
        return await sujet.save();

      }
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<PfesModel[]> {
    try {
      const pfes = await this._model.find();
      const results = pfes.map((pfe: PfesModel) => {
        const result = pfe
          .populate('student')
          .populate('enseignantsEncadrants')
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

      const results = pfes.map((pfe: PfesModel) => {
        const result = pfe
          .populate('student')
          .populate('enseignantsEncadrants')
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
      .populate('enseignantsEncadrants')
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
    const results = pfes.map((pfe) => {
      const result = pfe
        .populate('student')
        .populate('enseignantsEncadrants')
        .execPopulate()
      return result
    })
    return Promise.all(results);
  }

  async uploadRapport(rapportFilepath: string, etudiant: UtilisateursModel) {
    const pfe = await this._model.findOne({ studentId: etudiant.id }).exec();
    pfe.rapportFilepath = rapportFilepath;
    return pfe.save();
  }

  async canAddRapport(studentId: string): Promise<boolean> {
    //retoure vrai si l'étudiant a un pfe en cours et n'a pas encore uploadé son rapport
    return this._model.exists({ studentId, rapportFilepath: { $eq: null } })
  }

  async cannotAddSujet(studentId: string): Promise<boolean> {
    //retourne vrai si l'étudiant a un sujet en cours ou accepté
    return this._model.exists({ studentId, status: { $in: [Status.Accepte, Status.Attente] } })
  }

  async findEncadrementEnseignant(enseignantId: string): Promise<PfesModel[]> {
    return this._model.find({ enseignantsEncadrants: { $elemMatch: { $eq: enseignantId } } }).populate('student', 'firstname lastname').exec();
  }

}
