import { Controller, HttpCode, HttpStatus, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @ApiCreatedResponse({ description: 'Login method.' })
    @Post('login')
    async login(@Request() req) {
        return this.authService.logIn(req.user._doc);
    }
}
