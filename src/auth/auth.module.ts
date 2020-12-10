import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UtilisateursModule } from 'src/utilisateurs/utilisateurs.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports:[UtilisateursModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
