import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateAnneeUniversitairesDto {
  @IsNotEmpty()
  @ApiProperty()
  public intitule: string;
}

export default CreateAnneeUniversitairesDto;
