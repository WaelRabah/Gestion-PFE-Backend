import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class SuggestPfeModel extends Document {
  @Prop()
  public id: string;
  @Prop({ type: String, required: true })
  public description: string;
  @Prop({ type: String, required: true })
  public entreprise: string;
  @Prop({ type: String, required: true })
  public file: string;
  @Prop({ type: String, required: true })
  public titre: string;
}

export const SuggestPfeSchema = SchemaFactory.createForClass(SuggestPfeModel);
