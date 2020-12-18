import {  HttpException, Injectable } from '@nestjs/common';
import { UtilisateursModel } from 'src/utilisateurs/utilisateurs.model';
import { UtilisateursService } from 'src/utilisateurs/utilisateurs.service';
import { Payload } from './payload.interface';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor( private readonly userService: UtilisateursService){}

    async login(doc){

        try{
            const user = await this.userService.findByEmail(doc.email);
            if(!user){
                throw new HttpException('The email address ' + doc.email + ' is not associated with any account. Double-check your email address and try again.',403);   
            }
            if(!this.userService.comparePassword(doc.password,user.password)){
                throw new HttpException("Invalid email or password",403);
            }
            const payload: Payload = {
                id: user._id,
                email: user.email,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
            }
            return {
                token: sign(payload,process.env.JWT_SECRET,{
                  expiresIn: process.env.expiresIn
                })
            }
           

        } catch(error){
            throw new HttpException(error.message,400);
        }
    }

    async validate(payload: Payload): Promise<UtilisateursModel> {
        return await this.userService.get(payload.id);
    }
}
