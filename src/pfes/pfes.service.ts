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
import { SoutenancesService } from 'src/soutenances/soutenances.service';
import {send} from '../utils/emailSender'

@Injectable()
export class PfesService implements IBaseService<PfesModel> {
  constructor(@InjectModel('Pfes') private readonly _model: Model<PfesModel>, private readonly _soutenanceService: SoutenancesService) { }

  async create(doc: CreatePfesDto, filepath: string, etudiant: UtilisateursModel): Promise<PfesModel> {

    try {
      let sujet: PfesModel = await this._model.findOne({ student: etudiant.id });
      if (sujet) {
        if (sujet.status == Status.Refuse) {
          try {
            fs.unlinkSync(sujet.filepath);
          }
          catch(e)
          {

          }
          return await sujet.updateOne({ ...doc, filepath, status: Status.Attente, student: etudiant.id });
        }
        else throw new BadRequestException('Votre sujet est en attente ou a été déjà accepté');
      }
      else {
        sujet = new this._model({ ...doc, filepath, status: Status.Attente, student: etudiant.id });
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
     
      return await Promise.all(results)
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAllUnassigned(): Promise<PfesModel[]> {
    try {
      const _pfes = (await this._soutenanceService.getAll())
        .map(item => item.pfe._id)

      const pfes =await Promise.all((await this._model.find({ _id : { $nin : _pfes } }))
                    .map(async item=>{
                      const res = await item.populate('student')
                      .execPopulate()
                     
                      return res
                    }))

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
    const pfe: PfesModel =await (await this._model.findByIdAndUpdate(id, newDoc).populate('student')).execPopulate();
    if(newDoc.status == Status.Accepte){
      this.sendMailAccepte(pfe.student);
      return pfe;
    }
    else if (newDoc.status == Status.Refuse) {
      this.sendMailRefuse(pfe.student);
      return pfe;
    }
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
    const pfe = await this._model.findOne({ student: etudiant.id }).exec();
    pfe.rapportFilepath = rapportFilepath;
    return pfe.save();
  }

  async canAddRapport(student): Promise<boolean> {
    //retoure vrai si l'étudiant a un pfe en cours et n'a pas encore uploadé son rapport
    return this._model.exists({ student, rapportFilepath: { $eq: null }, status: Status.Accepte })
  }

  async cannotAddSujet(student): Promise<boolean> {
    //retourne vrai si l'étudiant a un sujet en cours ou accepté
    return this._model.exists({ student, status: { $in: [Status.Accepte, Status.Attente] } })
  }

  async findEncadrementEnseignant(enseignantId: string): Promise<PfesModel[]> {
    return this._model.find({ enseignantsEncadrants: { $elemMatch: { $eq: enseignantId } } }).populate('student', 'firstname lastname').exec();
  }

  async sendMailAccepte(etudiant: UtilisateursModel) {
    let subject = 'Sujet PFE accepté.';
    let to = etudiant.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Bonjour ${etudiant.firstname} ${etudiant.lastname}</p>
                <p>Félicitations! Votre sujet PFE a été accepté par l'administration</p>`
    return await send(to ,from, subject, html );
  }

  async sendMailRefuse(etudiant: UtilisateursModel) {
    let subject = 'Sujet PFE refusé.';
    let to = etudiant.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Bonjour ${etudiant.firstname} ${etudiant.lastname}</p>
                <p>Votre sujet PFE a été malheureusement refusé par l'administration</p>`
    return await send(to ,from, subject, html );
  }

}
