import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateSuggestPfeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(30)
  public description: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public entreprise: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public file: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public titre: string;
}

export default CreateSuggestPfeDto;
