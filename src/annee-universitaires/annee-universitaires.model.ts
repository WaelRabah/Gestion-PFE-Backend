import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
@Schema()
export class AnneeUniversitairesModel extends Document {
  @Prop({ type: String, required: true })
  @ApiProperty()
  public intitule: string;
}
export const AnneeUniversitairesSchema = SchemaFactory.createForClass(
  AnneeUniversitairesModel,
);
