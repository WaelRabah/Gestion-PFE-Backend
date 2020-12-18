import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateSoutenancesDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  public encadrantId: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public heure: string;
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  public presidentId: string;
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  public rapporteurId: string;
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  public type: boolean;
}

export default CreateSoutenancesDto;
