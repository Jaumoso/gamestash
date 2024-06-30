import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from './schema/game.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }]),],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
