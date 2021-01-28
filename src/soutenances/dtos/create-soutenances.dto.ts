import { ArrayNotEmpty, IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {  UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import { PfesModel } from 'src/pfes/pfes.model';
import { Type } from 'class-transformer';
class CreateSoutenancesDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public heure: string;

  @IsObject()
  @ApiProperty()
   @IsNotEmpty()
  public president: UtilisateursModel;

  @IsObject()
  @ApiProperty()
   @IsNotEmpty()
  public rapporteur: UtilisateursModel;
  @IsBoolean()
  @ApiProperty()
   @IsNotEmpty()
  public isItPublic: boolean;

  @IsObject()
  @ApiProperty()
   @IsNotEmpty()
  public student: UtilisateursModel;

  @IsObject()
  @ApiProperty()
   @IsNotEmpty()
  public pfe: PfesModel;
  @IsArray()
  @ArrayNotEmpty()
  public enseignantsEncadrants: UtilisateursModel[];
}

export default CreateSoutenancesDto;
