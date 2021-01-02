import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
@Schema()
export class SessionsModel extends Document {
  @Prop({ type: Date, required: true })
  public date: Date;
  @Prop({ type: String, required: true })
  public filiere: string;
  @Prop({ type: Number, required: true })
  public numero: number;

  @Prop({ type: String, required: true })
  public president: string;
  @Prop({ type: Types.ObjectId, required: true })
  public presidentId: string;
  @Prop({ type: Date })
  public deletedAt: Date;
}
export const SessionsSchema = SchemaFactory.createForClass(SessionsModel);
