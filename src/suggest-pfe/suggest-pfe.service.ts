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
import { Logger } from '@nestjs/common';
import {send} from '../utils/emailSender'

@Injectable()
export class SuggestPfeService implements IBaseService<SuggestPfeModel> {
  async findAll() : Promise<SuggestPfeModel[]> {
    return await this._model.find({status:Status.Accepte});
  }
  constructor(
    @InjectModel('Suggestions') private readonly _model: Model<SuggestPfeModel>,
  ) {}

  async create(doc: CreateSuggestPfeDto,filepath: string, status: Status, enseignant: UtilisateursModel): Promise<SuggestPfeModel> {
    try {
      const newDoc = new this._model({...doc,filepath,status,enseignant});
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
    const pfe: SuggestPfeModel =await (await this._model.findByIdAndUpdate(id, newDoc).populate('enseignant')).execPopulate();
    if(newDoc.status == Status.Accepte){
      this.sendMailSuggestionAcceptee(pfe.enseignant);
      return pfe;
    }
    else if (newDoc.status == Status.Refuse) {
      this.sendMailSuggestionRefusee(pfe.enseignant);
      return pfe;
    }
  }

  find(query: SearchPfeSuggestionDTO) : Promise<SuggestPfeModel[]> {
    return  this._model.find(query).populate('enseignant').exec();
  }

  async sendMailSuggestionAcceptee(enseignant) {
    let subject = 'Suggestion PFE acceptée.';
    let to = enseignant.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Bonjour ${enseignant.firstname} ${enseignant.lastname}</p>
                <p>Votre Suggestion PFE a été acceptée par l'administration</p>`
    return await send(to ,from, subject, html );
  }

  async sendMailSuggestionRefusee(enseignant) {
    let subject = 'Suggestion PFE refusé.';
    let to = enseignant.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Bonjour ${enseignant.firstname} ${enseignant.lastname}</p>
                <p>Votre Suggestion PFE a été malheureusement refusée par l'administration</p>`
    return await send(to ,from, subject, html );
  }
}
