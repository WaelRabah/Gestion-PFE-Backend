import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
@Schema()
export class UtilisateursModel extends Document {
  @Prop({ type: String, required: true })
  @ApiProperty()
  public password: string;

  @Prop({ type: Number, required: true })
  @ApiProperty()
  public role: Role;

  @Prop({ type: String, required: true })
  @ApiProperty()
  public username: string;

  @Prop({ type: String, required: true })
  @ApiProperty()
  public firstname: string;

  @Prop({ type: String, required: true })
  @ApiProperty()
  public lastname: string;

  @Prop({ type: String, required: true })
  @ApiProperty()
  public email: string;
  @Prop({ type: String })
  @ApiProperty()
  public departement: string;
  @Prop({ type: String })
  @ApiProperty()
  public grade: string;
  @Prop({ type: String })
  @ApiProperty()
  public annee: string;
  @Prop({ type: String })
  @ApiProperty()
  public filiere: string;
  @Prop({ type: String })
  @ApiProperty()
  public niveau: string;
}

export const UtilisateursSchema = SchemaFactory.createForClass(
  UtilisateursModel,
);
