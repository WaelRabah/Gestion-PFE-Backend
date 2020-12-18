import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateSuggestPfeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(30)
  @ApiProperty()
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

export default UpdateSuggestPfeDto;
