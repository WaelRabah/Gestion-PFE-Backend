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
  public filePath: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public titre: string;
  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty()
  public nomEncadrantEntreprise: string;
  
}

export default CreatePfesDto;
