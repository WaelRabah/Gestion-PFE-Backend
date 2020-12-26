import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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

  @IsString()
  @ApiProperty()
  public president: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public presidentId: string;
}

export default CreateSessionsDto;
