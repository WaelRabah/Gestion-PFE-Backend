import { ArrayNotEmpty, IsAlpha, IsArray, IsMongoId, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import { Transform } from 'class-transformer';
class CreatePfesDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public entreprise: string;


  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public titre: string;


  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty()
  public nomEncadrantEntreprise: string;

  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty()
  public description: string;
  @IsObject()
  @IsNotEmpty()
  @Transform(
    e=>{
  
      return JSON.parse(e)
    }
  )
  public student: UtilisateursModel;
  @IsArray()
  @ArrayNotEmpty()
  @Transform(
    e=>JSON.parse(e)
  )
  public enseignantsEncadrants: UtilisateursModel[];
}

export default CreatePfesDto;
