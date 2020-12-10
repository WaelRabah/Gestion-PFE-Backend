import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class PfesModel extends Document {
  @Prop({ type: String, required: true })
  @ApiProperty()
  public entreprise: string;
  @Prop({ type: String, required: true })
  @ApiProperty()
  public filePath: string;
  @Prop({ type: String, required: true })
  @ApiProperty()
  public titre: string;
}
export const PfesSchema = SchemaFactory.createForClass(PfesModel);
