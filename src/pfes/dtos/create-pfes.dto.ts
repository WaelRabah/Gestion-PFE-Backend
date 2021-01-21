import { IsAlpha, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @IsMongoId()
  @ApiProperty()
  public studentId: string;
}

export default CreatePfesDto;
