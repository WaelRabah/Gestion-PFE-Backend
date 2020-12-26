import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateSoutenancesDto {
  @IsMongoId()

  @ApiProperty()
  public encadrantId: string;

  @IsString()
  @ApiProperty()
  public heure: string;
  @IsMongoId()

  @ApiProperty()
  public presidentId: string;
  @IsMongoId()

  @ApiProperty()
  public rapporteurId: string;
  @IsMongoId()

  @ApiProperty()
  public pfeId: string;
  @IsMongoId()
  @ApiProperty()
  public studentId: string;

  @IsBoolean()
  @ApiProperty()
  public isItPublic: boolean;
  @IsMongoId()
  @ApiProperty()
  public sessionId: string;
}

export default UpdateSoutenancesDto;
