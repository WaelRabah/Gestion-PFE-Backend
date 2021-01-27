import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes, Types } from 'mongoose';
import { SoutenancesModel } from 'src/soutenances/soutenances.model';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
@Schema()
export class SessionsModel extends Document {
  @Prop({ type: Date, required: true })
  public date: Date;
  @Prop({ type: String, required: true })
  public filiere: string;
  @Prop({ type: Number, required: true })
  public numero: number;
  @Prop([{type : SchemaTypes.ObjectId,ref : 'SoutenancesModel'}])
  public soutenances: SoutenancesModel[];
  @Prop({ type: SchemaTypes.ObjectId, required: true , ref : 'UtilisateursModel' })
  public president: UtilisateursModel;
  @Prop({ type: Date })
  public deletedAt: Date;
}
export const SessionsSchema = SchemaFactory.createForClass(SessionsModel);
