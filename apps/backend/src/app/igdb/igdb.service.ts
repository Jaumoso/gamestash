import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IgdbService {

    private twitchAccessToken: string = null;
    private tokenExpirationTime: number = 0;


  async getIgdbToken(): Promise<string> {
    const twitchClientId = process.env.IGDB_CLIENT_ID;
    const twitchClientSecret = process.env.IGDB_SECRET;

    // If the token is already present and not expired, return it
    if (this.twitchAccessToken && Date.now() < this.tokenExpirationTime) {
      return this.twitchAccessToken
    }

    try {
      const authResponse = await axios.post('https://id.twitch.tv/oauth2/token', {
        client_id: twitchClientId,
        client_secret: twitchClientSecret,
        grant_type: 'client_credentials',
      });

      this.twitchAccessToken = authResponse.data.access_token;
      this.tokenExpirationTime = authResponse.data.expires_in * 1000 - 60000;


      // The token and expiration time can also be stored in a database if needed.

      return this.twitchAccessToken;
    } catch (error) {
      console.error('Twitch API Error:', error.message);
      throw error; // Rethrow the error to be handled by the controller's exception handler.
    }
  }
}