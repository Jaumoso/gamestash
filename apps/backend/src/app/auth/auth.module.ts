import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { 
        algorithm: 'HS256',
        expiresIn: '12h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
