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
import { UtilisateursService } from 'src/utilisateurs/utilisateurs.service';
import { PfesService } from 'src/pfes/pfes.service';
@Injectable()
export class SoutenancesService implements IBaseService<SoutenancesModel> {
  constructor(
    @InjectModel('Soutenances')
    private readonly _model: Model<SoutenancesModel>,
    private readonly _userService: UtilisateursService,
    private readonly _pfeService: PfesService
  ) { }

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
      return await this._model.find({ deletedAt: undefined });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async getAllArchived(): Promise<SoutenancesModel[]> {
    try {
      return await this._model.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async getAllBySession(sessionId: string): Promise<any[]> {
    try {
      let soutenances: any[] = await this._model.find({ sessionId: sessionId, deletedAt: undefined })
      soutenances = await Promise.all(soutenances.map(async item => {
        const { encadrantId, presidentId, studentId, pfeId } = item
        const encadrant = await this._userService.get(encadrantId)
        const president = await this._userService.get(presidentId)
        const student = await this._userService.get(studentId)
        const pfe = await this._pfeService.get(pfeId)

        return {
          original: item,
          displayable: {
            respInsat: encadrant.firstname + " " + encadrant.lastname,
            respEntreprise: pfe.nomEncadrantEntreprise,
            Examinateur: president.firstname + " " + president.lastname,
            entreprise: pfe.entreprise,
            candidat: student.firstname + " " + student.lastname,
            sujet: pfe.titre,
            heure: item.heure,
            isItPublic: item.isItPublic
          }
        }
      }))

      return soutenances;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<SoutenancesModel> {
    const doc = await this._model.find({ _id: id, deletedAt: undefined });
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
  async archive(
    id: string,
    sessionId: string,
  ): Promise<SoutenancesModel[]> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    doc.deletedAt = new Date()
    await this._model.findByIdAndUpdate(id, doc)
    return await this._model.find({ deletedAt: undefined, sessionId: sessionId });
  }
  async restore(
    id: string,
    sessionId: string,
  ): Promise<SoutenancesModel[]> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    doc.deletedAt = undefined
    await this._model.findByIdAndUpdate(id, doc)
    return await this._model.find({ deletedAt: { $ne: undefined }, sessionId: sessionId });
  }
}
