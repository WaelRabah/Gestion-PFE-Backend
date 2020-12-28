import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
import { Status } from 'src/enums/status.enum';
@Schema()
export class SuggestPfeModel extends Document {
  @Prop({ type: String, required: true })
  public description: string;

  @Prop({ type: String, required: true })
  public entreprise: string;

  @Prop({ type: String, required: true })
  public filepath: string;

  @Prop({ type: String, required: true })
  public titre: string;

  @Prop({ type: Types.ObjectId, required: true })
  public enseignantId: string;

  @Prop({type: String, required: true})
  public status: Status;
}

export const SuggestPfeSchema = SchemaFactory.createForClass(SuggestPfeModel);
