import {
  BadGatewayException,
  Injectable,
  Logger,
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
import { SoutenancesModel } from 'src/soutenances/soutenances.model';
import { SoutenancesService } from 'src/soutenances/soutenances.service';

@Injectable()
export class SessionsService implements IBaseService<SessionsModel> {
  constructor(
    @InjectModel('Sessions') private readonly _model: Model<SessionsModel>,
  ) { }

  async createPDF(id: string)  {

    try{
      const  myDoc = new pdf;
      const  doc = new pdf;

      if(!fs.existsSync(`./uploads/sessions/${id}.pdf`)){
        doc.pipe(fs.createWriteStream(`./uploads/sessions/${id}.pdf`));
       // doc.font('Times-Roman');	
        //doc.fontSize(30);
        let x1=doc.x;
        let x6=310;
        let session = await this._model.findById(id);
        session =await session.populate('soutenances').execPopulate();
        doc.rect(doc.x, doc.y, 450, 65)
        .moveTo(300, doc.y).lineTo(300, doc.y+65);
        for (let soutenance of session.soutenances){
          soutenance= await soutenance.populate('student').populate('president').execPopulate();
          doc.text('soutenance: '+ (soutenance.isItPublic?'public':'closed'),x1,doc.y,{indent:5, align:'left'})
           doc.moveDown(0.2)
           .text('heure:',x1,doc.y,{indent:5, align:'left'})
           .moveUp()
           .text(soutenance.heure,x6,doc.y)
           .moveDown(0.2)
           .text("student:",x1,doc.y,{indent:5, align:'left'})
           .moveUp()
           .text(soutenance.student.username,x6,doc.y)
           .moveDown(0.2)
           .text("president:",x1,doc.y,{indent:5, align:'left'})
           .moveUp()
           .text(soutenance.president.username,x6,doc.y)
           .moveDown(1.5);
        }
        doc.end();
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
      if (sessions.length)
      {
        const results = sessions.map(async (session)=>{
  
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
              .populate('rapporteur')
              .populate('student')
              .populate('pfe')
              .populate('enseignantsEncadrants')
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
        return Promise.all(results);

      }
    } catch (error) {
      throw new BadGatewayException(error);
    }
    return []
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

    console.log(newDoc,doc)
    if (!doc) throw new NotFoundException('Doc not found');
    return await this._model.findByIdAndUpdate(id, newDoc, { new: true });
  }
  async archive(
    id: string,
  ): Promise<SessionsModel[]> {
    const doc = await this.get(id);
    doc.soutenances.map(item=>{
      item.deleteOne(()=>{
        console.log('Soutenance deleted')
      })
    })
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

