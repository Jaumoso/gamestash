import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findUser(username);
        if (!user) {
            throw new NotAcceptableException("Couldn't find the user");
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        
        if (passwordValid) {
            const { password, ... rest } = user;
            return rest;
        }
        else{
            throw new NotAcceptableException('Invalid password');
        }
    }

    async logIn(user: any) {
        const payload = { 
            sub: user._id,
            username: user.username,
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
