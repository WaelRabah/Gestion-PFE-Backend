import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @IsString()
  @ApiProperty()
  public president: string;
}

export default UpdateSessionsDto;
