import { IsAlpha, IsAlphanumeric, IsMongoId, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SoutenancesModel } from 'src/soutenances/soutenances.model';
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
  @IsObject()
  @IsNotEmpty()
  public soutenance: SoutenancesModel;

  @IsAlphanumeric()
  @ApiProperty()
  public filepath: string;

  @IsAlphanumeric()
  @ApiProperty()
  public description: string;
}

export default UpdatePfesDto;
