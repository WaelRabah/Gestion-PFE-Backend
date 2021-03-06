import { Payload } from "../payload.interface";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UtilisateursModel } from "src/utilisateurs/utilisateurs.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor( private readonly authService: AuthService ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET  
        })
    }

    async validate(jwtPayload:Payload ): Promise<UtilisateursModel> {
        const user = await this.authService.validate(jwtPayload);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}