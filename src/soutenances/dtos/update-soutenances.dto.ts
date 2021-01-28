import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import { PfesModel } from 'src/pfes/pfes.model';
class UpdateSoutenancesDto {
  @IsArray()
  public enseignantsEncadrants: UtilisateursModel[];

  @IsString()
  @ApiProperty()
  public heure: string;

  @ApiProperty()
  @IsObject()
  public president: UtilisateursModel;

  @ApiProperty()
  @IsObject()
  public rapporteur: UtilisateursModel;
  @IsBoolean()
  @ApiProperty()
  public isItPublic: boolean;

  @ApiProperty()
  @IsObject()
  public student: UtilisateursModel;

  @ApiProperty()
  @IsObject()
  public pfe: PfesModel;
}

export default UpdateSoutenancesDto;
