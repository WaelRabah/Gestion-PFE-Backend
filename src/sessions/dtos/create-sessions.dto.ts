import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
class CreateSessionsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public date: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public filiere: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public numero: number;
  @ApiProperty()
  public president: UtilisateursModel;
}

export default CreateSessionsDto;
