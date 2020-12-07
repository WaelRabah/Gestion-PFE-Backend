import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class UtilisateursModel extends Document {
  @Prop()
  public id: string;
  @Prop({ type: String, required: true })
  public password: string;
  @Prop({ type: String, required: true })
  public role: string;
  @Prop({ type: String, required: true })
  public username: string;
  @Prop({ type: String, required: true })
  public firstname: string;
  @Prop({ type: String, required: true })
  public lastname: string;
  @Prop({ type: String, required: true })
  public email: string;
}

export const UtilisateursSchema = SchemaFactory.createForClass(
  UtilisateursModel,
);
