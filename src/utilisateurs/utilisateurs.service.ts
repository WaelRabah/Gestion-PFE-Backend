import { IBaseService } from './../base/Ibase.service';
import { UtilisateursModel } from './utilisateurs.model';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadGatewayException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UtilisateursService implements IBaseService<UtilisateursModel> {
  constructor(
    @InjectModel('Utilisateurs')
    private readonly _model: Model<UtilisateursModel>,
  ) {}

  async create(doc: UtilisateursModel)  {
    try {
      const user = await this._model.findOne({email: doc.email});
      if(user){
        throw new HttpException("email is already associated with another account",403)
      }
      const newUser = new this._model(doc);
      const hashedPassword = await bcrypt.hash(newUser.password,10);
      newUser.password = hashedPassword as string;
      await newUser.save();
      return { message:"User created"}
    } catch (error) {
      throw new HttpException(error.message,400);
    }
  }
  
  async generatePasswordReset( user: UtilisateursModel ): Promise<void> {
    try{
      user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordExpires = Date.now() + 3600000 ;
      await user.save();
    } catch(error){
      throw new BadGatewayException(error.message)
    }
  }

  async findByEmail(email : string): Promise<UtilisateursModel> {
    return await this._model.findOne({email});
  }


  comparePassword(pass:string, password: string) {
    return bcrypt.compareSync(pass, password);
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
