import { IsAlphanumeric, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdatePfesDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty()
  public entreprise: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty()
  public filepath: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty()
  public titre: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty()
  public description: string;
}

export default UpdatePfesDto;
