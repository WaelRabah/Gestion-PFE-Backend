import { IsIn, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../enums/status.enum';
class StatusChangeDTO {
  @IsIn([Status.Accepte, Status.Attente, Status.Refuse], {
    message:
      'Status should be one of 3 values : [Accepté, En Attente, Refusé]',
  })
  @IsNotEmpty()
  @ApiProperty()
  public status: Status;
}

export default StatusChangeDTO;
