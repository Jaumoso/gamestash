import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        type: String, 
        description: 'Username of the account.',
        example: "nickname",
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    username: string;

    @ApiProperty({
        type: String, 
        description: 'User password. Minimum lenght of 2, maximum lenght of 30.',
        example: 'password'
    })
    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    password: string;

/*     @ApiProperty({
        type: String, 
        description: 'Imágen de perfil del usuario.',
        example: 'assets/profilepic.png'
    })
    @IsString()
    profilePic: string; */

    @ApiProperty({
        type: Date,
        description: 'Date of account creation.',
        example: new Date(2023, 5, 27).toISOString()
    })
    @IsNotEmpty()
    joined: Date;

    @ApiProperty({
        type: Date,
        description: 'Last time the user was connected to the application.',
        example: new Date(2023, 5, 27).toISOString()
    })
    @IsNotEmpty()
    lastSeen: Date;

    @ApiProperty({
        description: 'User game library. Contains all the game data.',
        example: [{
            gameId: 12345,
            name: "default name",
            releaseDate: new Date(2018, 5, 15).toISOString(),
            cover: "https://cover.png",
            rating: 8,
            platforms: ['PC'],
            storefronts: ['Steam'],
            acquisitionDate: new Date(2023, 8, 1).toISOString(),
            acquisitionPrice: 0,
            own: true,
            format: 'digital',
            state: 'Not Interested',
            time: 152.5,
            comment: 'Default comment.'
        }],
    })
    library: {
        gameId: number,
        name: string,
        releaseDate: Date,
        cover: string,
        rating: number,
        platforms?: string[],
        storefronts?: string[],
        acquisitionDate?: Date,
        acquisitionPrice?: number,
        own: boolean,
        format: string,
        state: string,
        time: number,
        comment: string
    }[];
    
}