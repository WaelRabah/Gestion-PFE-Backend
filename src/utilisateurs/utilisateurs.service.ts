/* eslint-disable prefer-const */
import { IBaseService } from './../base/Ibase.service';
import { UtilisateursModel } from './utilisateurs.model';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadGatewayException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as sgMail from '@sendgrid/mail';
@Injectable()
export class UtilisateursService implements IBaseService<UtilisateursModel> {
  
  constructor(
    @InjectModel('Utilisateurs')
    private readonly _model: Model<UtilisateursModel>,
  ) {
    try{
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    } catch(err){
      throw new HttpException(err.message,400);
    }
  }

  async create(doc : UtilisateursModel)  {
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

  async recoverPassword(email: string) {
    
    try{
      const user = await this.findByEmail(email);
      if(!user){
        throw new HttpException('The email address ' + email + ' is not associated with any account. Double-check your email address and try again.',401)
      }
      this.generatePasswordReset(user);
      let subject = "Password change request";
      let to = user.email;
      let from = process.env.FROM_EMAIL;
      let link = "https://www.google.com"+user.resetPasswordToken;
      let html = `<p>Hi ${user.username}</p>
                  <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

      await sgMail.send({to,subject,from,html})
    } catch (error){
      throw new HttpException(error.message,400)
    }
  }

  async resetPassword(token: string, doc){

    try{
      const user = await this._model.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});
      if (!user){
        throw new HttpException('Password reset token is invalid or has expired.',401)
      }
      user.password = await bcrypt.hash(doc.password,10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      let subject = "Your password has been changed";
      let to = user.email;
      let from = process.env.FROM_EMAIL;
      let html = `<p>Hi ${user.username}</p>
                  <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`
      await sgMail.send({to,subject,from,html})
    } catch(error){
      throw new HttpException(error.message,400)
    }
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
