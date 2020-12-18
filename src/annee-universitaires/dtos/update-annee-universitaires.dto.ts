import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateAnneeUniversitairesDto {
  @IsNotEmpty()
  @ApiProperty()
  public intitule: string;
}

export default UpdateAnneeUniversitairesDto;
