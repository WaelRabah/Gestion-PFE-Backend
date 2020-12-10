import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class SoutenancesModel extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  @ApiProperty()
  public encadrantId: string;
  @Prop({ type: String, required: true })
  @ApiProperty()
  public heure: string;
  @Prop({ type: Types.ObjectId, required: true })
  @ApiProperty()
  public presidentId: string;
  @Prop({ type: Types.ObjectId, required: true })
  @ApiProperty()
  public rapporteurId: string;
  @Prop({ type: Boolean, required: true })
  @ApiProperty()
  public type: boolean;
}
export const SoutenancesSchema = SchemaFactory.createForClass(SoutenancesModel);
