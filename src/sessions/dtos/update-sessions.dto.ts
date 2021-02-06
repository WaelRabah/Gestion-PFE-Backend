import { IsDateString, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
class UpdateSessionsDto {
  @IsString()
  @ApiProperty()
  public date: Date;
  @IsString()
  @ApiProperty()
  public filiere: string;
  @IsString()
  @ApiProperty()
  public numero: number;
  @ApiProperty()
  @IsObject()
  public president: UtilisateursModel;
}

export default UpdateSessionsDto;
