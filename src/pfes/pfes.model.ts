import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PfesModel extends Document {
  @Prop({ type: String, required: true })
  public entreprise: string;
  @Prop({ type: String, required: true })
  public filePath: string;
  @Prop({ type: String, required: true })
  public titre: string;
}
export const PfesSchema = SchemaFactory.createForClass(PfesModel);
