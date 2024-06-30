import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { 
        algorithm: 'HS256',
        expiresIn: '60s'
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy,
  ]
})
export class AuthModule {}
