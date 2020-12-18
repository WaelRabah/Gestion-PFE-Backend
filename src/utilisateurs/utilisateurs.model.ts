import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Role } from './enums/role.enum';
@Schema()
export class UtilisateursModel extends Document {
  @Prop({ type: String, required: true })
  public password: string;

  @Prop({ type: String, required: true })
  public role: Role;

  @Prop({ type: String, required: true })
  public username: string;

  @Prop({ type: String, required: true })
  public firstname: string;

  @Prop({ type: String, required: true })
  public lastname: string;

  @Prop({ type: String, required: true })
  public email: string;
  @Prop({ type: String })
  public departement: string;
  @Prop({ type: String })
  public grade: string;
  @Prop({ type: String })
  public annee: string;
  @Prop({ type: String })
  public filiere: string;
  @Prop({ type: String })
  public niveau: string;

  @Prop({ type: String, required: false })
  public resetPasswordToken: string;

  @Prop({ type: Number, required: false })
  public resetPasswordExpires: number;
}

export const UtilisateursSchema = SchemaFactory.createForClass(
  UtilisateursModel,
);
