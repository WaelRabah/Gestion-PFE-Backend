import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
class CreateUtilisateursDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public password: string;
  @IsIn([Role.Administrateur, Role.Enseignant, Role.Etudiant], {
    message:
      'role should be one of 3 values : [  Administrateur,Enseignant,Etudiant,]',
  })
  @IsNotEmpty()
  @ApiProperty()
  public role: Role;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public firstname: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public lastname: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public departement: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public grade: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public annee: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public filiere: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public niveau: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public resetPasswordToken: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public resetPasswordExpires: number;
}

export default CreateUtilisateursDto;
