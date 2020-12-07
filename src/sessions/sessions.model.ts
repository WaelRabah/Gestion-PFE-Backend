import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class SessionsModel extends Document {
  @Prop()
  public id: string;
  @Prop({ type: Date, required: true })
  public date: Date;
  @Prop({ type: String, required: true })
  public filiere: string;
  @Prop({ type: Number, required: true })
  public numero: number;
}
export const SessionsSchema = SchemaFactory.createForClass(SessionsModel);
