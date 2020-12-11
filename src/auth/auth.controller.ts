import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService){}

    @ApiResponse({
        status: 200,
        description: 'The record has been successfully created.',
      })
      @ApiResponse({ status: 403, description: 'Forbidden.' })
      @ApiResponse({ status: 400, description: 'Bad Request.' })
      @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Body() doc: LoginDto){
        return await this.authService.login(doc);
    }

}
