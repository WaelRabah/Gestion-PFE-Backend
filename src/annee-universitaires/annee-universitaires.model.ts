import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
@Schema()
export class AnneeUniversitairesModel extends Document {
  @Prop({ type: String, required: true })
  public intitule: string;
}
export const AnneeUniversitairesSchema = SchemaFactory.createForClass(
  AnneeUniversitairesModel,
);
