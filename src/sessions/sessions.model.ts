import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
@Schema()
export class SessionsModel extends Document {
  @Prop({ type: Date, required: true })
  @ApiProperty()
  public date: Date;
  @Prop({ type: String, required: true })
  @ApiProperty()
  public filiere: string;
  @Prop({ type: Number, required: true })
  @ApiProperty()
  public numero: number;
}
export const SessionsSchema = SchemaFactory.createForClass(SessionsModel);
