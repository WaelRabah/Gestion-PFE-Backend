import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

@Schema()
export class PfesModel extends Document {
  @Prop({ type: String, required: true })
  public entreprise: string;
  @Prop({ type: String, required: true })
  public filepath: string;
  @Prop({ type: String, required: true })
  public titre: string;
  @Prop({ type: String, required: true })
  public nomEncadrantEntreprise: string;
  @Prop({ type: Types.ObjectId })
  public soutenanceId: string;
  @Prop({ type: Types.ObjectId })
  public studentId: string;
  @Prop({type: String, required: true})
  public description: string;
}
export const PfesSchema = SchemaFactory.createForClass(PfesModel);
