import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
@Schema()
export class SuggestPfeModel extends Document {
  @Prop()
  public id: string;
  @Prop({ type: String, required: true })
  @ApiProperty()
  public description: string;
  @Prop({ type: String, required: true })
  @ApiProperty()
  public entreprise: string;

  @Prop({ type: String, required: true })
  @ApiProperty()
  public file: string;
  @Prop({ type: String, required: true })
  @ApiProperty()
  public titre: string;
}

export const SuggestPfeSchema = SchemaFactory.createForClass(SuggestPfeModel);
