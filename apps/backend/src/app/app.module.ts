import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { IgdbModule } from './igdb/igdb.module';
import { StorefrontModule } from './storefront/storefront.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      retryAttempts: 3,
      retryDelay: 60000,
    }),
    UserModule,
    AuthModule,
    GameModule,
    IgdbModule,
    StorefrontModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
