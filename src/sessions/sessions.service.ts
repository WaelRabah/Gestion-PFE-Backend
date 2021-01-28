import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBaseService } from '../base/Ibase.service';
import { Model } from 'mongoose';
import { SessionsModel } from './sessions.model';
import { InjectModel } from '@nestjs/mongoose';
import UpdateSessionsDto from './dtos/update-sessions.dto';
import CreateSessionsDto from './dtos/create-sessions.dto';
import * as pdf from 'pdfkit'
import * as fs from 'fs';

@Injectable()
export class SessionsService implements IBaseService<SessionsModel> {
  constructor(
    @InjectModel('Sessions') private readonly _model: Model<SessionsModel>,
  ) { }

  async createPDF(id: string)  {

    try{
      const  myDoc = new pdf;

      if(!fs.existsSync(`./uploads/sessions/${id}.pdf`)){
        myDoc.pipe(fs.createWriteStream(`./uploads/sessions/${id}.pdf`));
        myDoc.font('Times-Roman');	
        myDoc.fontSize(30);
        myDoc.text('hello world' , 50 , 50 );
        myDoc.end();
      }
      return {
        filename: `${id}.pdf`
      };
    } catch(err) {
      throw new BadGatewayException(err.message);
    }

  }

  async create(doc: CreateSessionsDto): Promise<SessionsModel> {
    try {
      const newDoc = new this._model(doc);
      return await newDoc.save();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<SessionsModel[]> {
    try {
      const sessions = await this._model.find({ deletedAt: undefined })
      const results = sessions.map(async (session)=>{
        console.log(session)
        const result =await session
        .populate('soutenances')
        .populate('president')
        .execPopulate()
        
        result.soutenances = await Promise.all(
          result
        .soutenances
        .map(
          (item)=>{
          const res=  item
            .populate('president')
            .populate('encadrant')
            .populate('rapporteur')
            .populate('student')
            .populate('pfe')
            .execPopulate()
            return res
          }
        )
        )
        result.soutenances = await Promise.all(
          result
        .soutenances
        .map(
          async (item)=>{
          item.pfe = await item
          .pfe
          .populate('enseignantsEncadrants')
          .execPopulate()
         
          return item
          }
        )
        )

        
        return result
      })
      console.log(await Promise.all(results))
      return Promise.all(results);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: string): Promise<SessionsModel> {
    const doc = await this._model.findOne({ _id: id, deletedAt: undefined });
    const result =await doc
    .populate('soutenances')
    .populate('president')
    .execPopulate()
    result.soutenances = await Promise.all(
      result
    .soutenances
    .map(
      (item)=>{
      const res=  item
        .populate('president')
        .populate('encadrant')
        .populate('rapporteur')
        .populate('student')
        .populate('pfe')
        .execPopulate()
        return res
      }
    )
    )
    result.soutenances = await Promise.all(
      result
    .soutenances
    .map(
      async (item)=>{
      item.pfe = await item
      .pfe
      .populate('enseignantsEncadrants')
      .execPopulate()
      console.log('shiit',item.pfe.enseignantsEncadrants[0])
      return item
      }
    )
    )
    if (!doc) throw new NotFoundException('Document not found');

    return await result;
  }

  async delete(id: string): Promise<void> {
    const doc = await this._model.findById(id);
    if (!doc) throw new NotFoundException('Document not found');

    await this._model.findByIdAndDelete(id);
  }

  async update(id: string, newDoc: UpdateSessionsDto): Promise<SessionsModel> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc, { new: true });
  }
  async archive(
    id: string,
  ): Promise<SessionsModel[]> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    doc.deletedAt = new Date()
    await this._model.findByIdAndUpdate(id, doc)
    return await this._model.find({ deletedAt: undefined });
  }

  async restore(
    id: string,
  ): Promise<SessionsModel[]> {
    const doc = await this.get(id);
    if (!doc) throw new NotFoundException('Doc not found');
    doc.deletedAt = undefined
    await this._model.findByIdAndUpdate(id, doc)
    return await this._model.find({ deletedAt: { $ne: undefined } });
  }


}

