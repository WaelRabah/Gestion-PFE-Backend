import { IsBoolean, IsMongoId, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {  UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import { PfesModel } from 'src/pfes/pfes.model';
import { Type } from 'class-transformer';
class CreateSoutenancesDto {

  @ApiProperty()

  @IsObject()
  public encadrant: UtilisateursModel;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public heure: string;

  @IsObject()
  @ApiProperty()
  public president: UtilisateursModel;

  @IsObject()
  @ApiProperty()
  public rapporteur: UtilisateursModel;
  @IsBoolean()
  @ApiProperty()
  public isItPublic: boolean;

  @IsObject()
  @ApiProperty()
  public student: UtilisateursModel;

  @IsObject()
  @ApiProperty()
  public pfe: PfesModel;
}

export default CreateSoutenancesDto;
