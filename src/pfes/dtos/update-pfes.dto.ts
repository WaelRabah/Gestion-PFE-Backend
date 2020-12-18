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
  public filePath: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty()
  public titre: string;
}

export default UpdatePfesDto;
