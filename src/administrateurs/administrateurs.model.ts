import { SchemaFactory } from '@nestjs/mongoose';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';

export class AdministrateursModel extends UtilisateursModel {}
export const AdministrateursSchema = SchemaFactory.createForClass(
  AdministrateursModel,
);
