import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class AjoutEnseignantDTO {
    
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
    departement:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    grade:string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    role:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username:string;
}
export default AjoutEnseignantDTO;