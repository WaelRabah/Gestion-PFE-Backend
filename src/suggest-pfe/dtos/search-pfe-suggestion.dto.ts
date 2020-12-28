import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../enums/status.enum';
class SearchPfeSuggestionDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  public entreprise: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public titre: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public description: string;

  @IsIn([Status.Accepte, Status.Attente, Status.Refuse], {
    message:
      'Status should be one of 3 values : [Accepté, En Attente, Refusé]',
  })
  @IsOptional()
  @ApiProperty()
  public status: Status;
}

export default SearchPfeSuggestionDTO;
