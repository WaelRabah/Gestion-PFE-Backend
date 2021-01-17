import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class AjoutEtudiantDTO {
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstname:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastname:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    annee:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    filiere:string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string;
}

export default AjoutEtudiantDTO;