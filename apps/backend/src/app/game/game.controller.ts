import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';

@ApiTags('Game')
@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) { }
    
    @Get('/search/:gameTitleSearch')
    @ApiCreatedResponse({ description: 'Function to search for games by title.' })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: Could not find the game!'
    })
    async GameSearch(@Param('gameTitleSearch') gameTitleSearch: string) {
        try {
            return await this.gameService.gameSearch(gameTitleSearch);
        }
        catch (err) {
            throw new HttpException('Error:  Could not find the game!', HttpStatus.BAD_REQUEST)
        }
    }

    @Post('getByIds')
    @ApiCreatedResponse({ description: 'Gets the games on your library from IGDB by ID.' })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: Could not find the games by id!'
    })
    async createGame(@Body() gameIds: number[]) {
        try {
            return await this.gameService.getGamesByIds(gameIds);
        }
        catch (err) {
            throw new HttpException('Error: Could not find the games by id!', HttpStatus.BAD_REQUEST)
        }
    }

    @Post('getAllInfo')
    @ApiCreatedResponse({ description: 'Gets all the info for a specific game.' })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: Could not find the game info!'
    })
    async getAllGameInfo(@Body() { gameId }: { gameId: number }) {
      try {
        const responsePayload = await this.gameService.getAllGameInfo(gameId);
        return responsePayload.data[0];
      } catch (err) {
        throw new HttpException('Error: Could not find the game info!', HttpStatus.BAD_REQUEST)
      }
    }

    @Post('getGamePlatforms')
    @ApiCreatedResponse({ description: 'Gets all the info for a specific game.' })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: Could not get game platforms!'
    })
    async getGamePlatforms(@Res() response, @Body() { gameId }: { gameId: number }) {
      try {
        const responsePayload = await this.gameService.getGamePlatforms(gameId);
        return responsePayload.data[0];
      } catch (err) {
        throw new HttpException('Error: Could not find game platforms!', HttpStatus.BAD_REQUEST)
      }
    }

}
