import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('authentification')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService){}

    @ApiResponse({
        status: 200,
        description: 'Logged successfully.',
      })
      @ApiResponse({ status: 403, description: 'Forbidden.' })
      @ApiResponse({ status: 400, description: 'Bad Request.' })
      @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Body() doc: LoginDto){
        return await this.authService.login(doc);
    }

}
