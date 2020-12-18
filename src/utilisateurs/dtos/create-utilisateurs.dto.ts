import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
class CreateUtilisateursDto {
  @IsNotEmpty()
  @IsString()
  public password: string;
  @IsIn([Role.Administrateur, Role.Enseignant, Role.Etudiant], {
    message:
      'statut should be one of 3 values : [  Administrateur,Enseignant,Etudiant,]',
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
  @IsOptional()
  @IsString()
  @ApiProperty()
  public departement: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  public grade: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  public annee: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  public filiere: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  public niveau: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  public resetPasswordToken: string;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  public resetPasswordExpires: number;
}

export default CreateUtilisateursDto;
