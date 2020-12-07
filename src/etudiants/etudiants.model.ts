import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
@Schema()
export class EtudiantsModel extends UtilisateursModel {
  @Prop({ type: String, required: true })
  public annee: string;
  @Prop({ type: String, required: true })
  public filiere: string;
  @Prop({ type: String, required: true })
  public niveau: string;
}

export const EtudiantsSchema = SchemaFactory.createForClass(EtudiantsModel);
