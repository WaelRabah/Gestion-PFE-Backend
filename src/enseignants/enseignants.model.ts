import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class EnseignantsModel extends UtilisateursModel {
  @Prop({ type: String, required: true })
  public departement: string;
  @Prop({ type: String, required: true })
  public grade: string;
}

export const EnseignantsSchema = SchemaFactory.createForClass(EnseignantsModel);
