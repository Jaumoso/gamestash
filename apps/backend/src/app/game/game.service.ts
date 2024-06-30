import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameDocument } from './schema/game.schema';
import axios from 'axios';
import { IgdbService } from '../igdb/igdb.service';

export const apiAuth = {
    useFactory: async (igdbService: IgdbService) => {
      return await igdbService.getIgdbToken();
    },
    inject: [IgdbService]
}

@Injectable()
export class GameService {
    constructor(@InjectModel('Game') private gameModel:Model<GameDocument>) { }
    async gameSearch(searchGameTitle: string): Promise<any[]> {
        let searchResult = null;
        let games: any[] = [];
        try {
            const igdbService = new IgdbService();
            const accessToken = await apiAuth.useFactory(igdbService);
            const response = await axios({
                method: 'post',
                url: 'https://api.igdb.com/v4/games',
                headers: {
                   'Client-ID': process.env.IGDB_CLIENT_ID,
                   Authorization: 'Bearer ' + accessToken,
                   Accept: 'application/json'
                }, 
                data: `search "${searchGameTitle}"; limit 20; fields name,first_release_date,cover.image_id,platforms.name;`
              });
              searchResult = response.data;
        } catch (error) {
            console.log(error);
        }

        try {
            searchResult.forEach((game: { id: any; name: any; first_release_date: number; cover: any; platforms: any; }) => {
                games.push({
                    id: game.id,
                    name: game.name,
                    first_release_date: game.first_release_date * 1000,
                    cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`,
                    platforms: game.platforms
                });
            })
        } catch (error) {
            console.log(error);
        }
        return games;
    }

    async getGamesByIds(gameIds: Number[]): Promise<any[]> {
        if(gameIds.length > 0){
            let searchResult = null;
            let games: any[] = [];
            let gameIdsArray = gameIds.join(',');
            try {
                const igdbService = new IgdbService();
                const accessToken = await apiAuth.useFactory(igdbService);
                const response = await axios({
                    method: 'post',
                    url: 'https://api.igdb.com/v4/games',
                    headers: {
                       'Client-ID': process.env.IGDB_CLIENT_ID,
                       Authorization: 'Bearer ' + accessToken,
                       Accept: 'application/json'
                    }, 
                    data: `fields name,first_release_date,cover.image_id; where id = (${gameIdsArray});`
                  });
                  console.log(response.data)
                  searchResult = response.data;
            } catch (error) {
                console.log(error);
            }
    
            try {
                searchResult.forEach((game) => {
                    games.push({
                        id: game.id,
                        name: game.name,
                        first_release_date: game.first_release_date * 1000,
                        cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`,
                    });
                })
            } catch (error) {
                console.log(error);
            }
            return games;
        }
        else {
            console.log("No games in the user library")
        }
    }

    async getAllGameInfo(gameId: Number): Promise<any> {
        if(gameId){
            try {
                const igdbService = new IgdbService();
                const accessToken = await apiAuth.useFactory(igdbService);
                const response = await axios({
                    method: 'post',
                    url: 'https://api.igdb.com/v4/games',
                    headers: {
                       'Client-ID': process.env.IGDB_CLIENT_ID,
                       Authorization: 'Bearer ' + accessToken,
                       Accept: 'application/json'
                    }, 
                    data: `
                    fields *, 
                    cover.image_id, 
                    screenshots.image_id, 
                    first_release_date, 
                    genres.name,
                    platforms.abbreviation, 
                    involved_companies.developer,
                    involved_companies.publisher,
                    involved_companies.supporting,
                    involved_companies.company.name
                    ; 
                    where id = ${gameId};`

                    // Not used:
                    // platforms.platform_logo.image_id,
                  });
                  return response;
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("No gameId provided.")
        }
    }

    async getGamePlatforms(gameId: number): Promise<any> {
        if(gameId){
            try {
                const igdbService = new IgdbService();
                const accessToken = await apiAuth.useFactory(igdbService);
                const response = await axios({
                    method: 'post',
                    url: 'https://api.igdb.com/v4/games',
                    headers: {
                       'Client-ID': process.env.IGDB_CLIENT_ID,
                       Authorization: 'Bearer ' + accessToken,
                       Accept: 'application/json'
                    }, 
                    data: `
                    fields platforms.name;
                    where id = ${gameId};`
                  });
                  return response;
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("No gameId provided.")
        }
    }
}
