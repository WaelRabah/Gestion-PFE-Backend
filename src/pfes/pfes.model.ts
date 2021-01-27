import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes, Types } from 'mongoose';
import { SoutenancesModel } from 'src/soutenances/soutenances.model';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import { Status } from '../enums/status.enum';

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

  @Prop({ type: SchemaTypes.ObjectId })
  public soutenance: SoutenancesModel;

  @Prop({ type: SchemaTypes.ObjectId })
  public student: UtilisateursModel;

  @Prop({ type: String, required: true })
  public description: string;

  @Prop({ type: String, required: true })
  public status: Status;

  @Prop({type: String})
  public rapportFilepath: string;
}
export const PfesSchema = SchemaFactory.createForClass(PfesModel);

