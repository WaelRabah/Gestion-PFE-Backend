import {IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class ResetPasswordDTO {

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    confirmed_password: string;
}

export default ResetPasswordDTO;