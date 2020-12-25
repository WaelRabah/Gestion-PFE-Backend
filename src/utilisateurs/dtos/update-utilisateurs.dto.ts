import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
class UpdateUtilisateursDto {
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public password: string;
  
  @IsOptional()
  @IsIn([Role.Administrateur, Role.Enseignant, Role.Etudiant], {
    message:
      'statut should be one of 3 values : [  Administrateur,Enseignant,Etudiant,]',
  })
  @IsNotEmpty()
  @ApiProperty()
  public role: Role;
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public username: string;
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public firstname: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public lastname: string;
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public departement: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public grade: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public annee: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public filiere: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public niveau: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public resetPasswordToken: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public resetPasswordExpires: number;
}

export default UpdateUtilisateursDto;
