import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
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
    @Post()
    async login(@Body() doc: LoginDto){
        return await this.authService.login(doc);
    }

    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async hello(){
        return 'hello'
    }
}
