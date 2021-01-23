import { ArrayNotEmpty, IsAlpha, IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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

  @IsArray()
  @ArrayNotEmpty()
  @Transform(
    e=>JSON.parse(e)
  )
  public enseignantsEncadrants: string[];
}

export default CreatePfesDto;
