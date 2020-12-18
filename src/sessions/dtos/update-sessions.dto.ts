import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateSessionsDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  public date: Date;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public filiere: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public numero: number;
}

export default UpdateSessionsDto;
