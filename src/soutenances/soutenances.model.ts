import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { PfesModel } from 'src/pfes/pfes.model';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
@Schema()
export class SoutenancesModel extends Document {
  @Prop({type: [{ type: SchemaTypes.ObjectId ,ref : 'Utilisateurs'}]})
  public enseignantsEncadrants: UtilisateursModel[];
  @Prop({ type: String, required: true })
  public heure: string; 
  @Prop({ type: SchemaTypes.ObjectId,  ref : 'Utilisateurs' })
  public president: UtilisateursModel;
  @Prop({ type: SchemaTypes.ObjectId,  ref : 'Utilisateurs' })
  public rapporteur: UtilisateursModel;
  @Prop({ type: SchemaTypes.ObjectId,  ref : 'Utilisateurs' })
  public student: UtilisateursModel;
  @Prop({ type: SchemaTypes.ObjectId,  ref : 'Pfes' })
  public pfe: PfesModel;
  @Prop({ type: Boolean })
  public isItPublic: boolean;
  @Prop({ type: Date })
  public deletedAt: Date;
}
export const SoutenancesSchema = SchemaFactory.createForClass(SoutenancesModel);