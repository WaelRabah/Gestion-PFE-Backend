import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class SoutenancesModel extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  public encadrantId: string;
  @Prop({ type: String, required: true })
  public heure: string;
  @Prop({ type: Types.ObjectId, required: true })
  public presidentId: string;
  @Prop({ type: Types.ObjectId, required: true })
  public rapporteurId: string;
  @Prop({ type: Types.ObjectId, required: true })
  public studentId: string;
  @Prop({ type: Types.ObjectId, required: true })
  public pfeId: string;
  @Prop({ type: Types.ObjectId, required: true })
  public sessionId: string;
  @Prop({ type: Boolean, required: true })
  public isItPublic: boolean;
}
export const SoutenancesSchema = SchemaFactory.createForClass(SoutenancesModel);
