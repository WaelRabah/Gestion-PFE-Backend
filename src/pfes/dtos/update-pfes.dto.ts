import { IsAlpha, IsAlphanumeric, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdatePfesDto {
  @IsAlphanumeric()
  @ApiProperty()
  public entreprise: string;

  @IsAlphanumeric()
  @ApiProperty()
  public filePath: string;

  @IsAlphanumeric()
  @ApiProperty()
  public titre: string;

  @IsAlpha()
  @ApiProperty()
  public nomEncadrantEntreprise: string;
  @IsMongoId()
  @IsNotEmpty()
  public soutenanceId: string;
}

export default UpdatePfesDto;
