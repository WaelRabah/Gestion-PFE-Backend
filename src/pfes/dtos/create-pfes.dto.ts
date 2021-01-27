import { IsAlpha, IsMongoId, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
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
  @IsNotEmpty()
  @IsObject()
  @ApiProperty()
  public student: UtilisateursModel;
}

export default CreatePfesDto;
