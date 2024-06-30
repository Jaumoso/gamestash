import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateGameDto {

    @ApiProperty({
        type: String, 
        description: 'Título del juego.',
        example: "title"
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: String, 
        description: 'Descripción del juego.',
        example: 'description'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: String, 
        description: 'Imagen del juego.',
        example: 'assets/imagen.jpg'
    })
    @IsString()
    image: string;

    @ApiProperty({
        type: Date, 
        description: 'Fecha de salida del juego.',
        example: new Date(2023, 1, 15).toISOString()
    })
    @IsString()
    @IsNotEmpty()
    released: Date;

    @ApiProperty({
        type: mongoose.Types.ObjectId, 
        description: 'Desarrollador del juego.',
        example: new mongoose.Types.ObjectId()
    })
    @IsNotEmpty()
    developer: mongoose.Types.ObjectId;

    @ApiProperty({
        type: mongoose.Types.ObjectId,
        description: 'Editora del juego.',
        example: new mongoose.Types.ObjectId()
    })
    @IsNotEmpty()
    publisher: mongoose.Types.ObjectId;

    @ApiProperty({
        type: mongoose.Types.ObjectId,
        description: 'Género del juego.',
        example: [new mongoose.Types.ObjectId()]
    })
    genre: mongoose.Types.ObjectId[];
    
    @ApiProperty({
        type: mongoose.Types.ObjectId,
        description: 'Franquicia del juego.',
        example: new mongoose.Types.ObjectId()
    })
    @IsString()
    franchise: mongoose.Types.ObjectId;

    @ApiProperty({
        type: mongoose.Types.ObjectId,
        description: 'Plataforma del juego.',
        example: [new mongoose.Types.ObjectId()]
    })
    platform: mongoose.Types.ObjectId[];

    @ApiProperty({
        type: mongoose.Types.ObjectId,
        description: 'Tienda del juego.',
        example: [new mongoose.Types.ObjectId()]
    })
    storefront: mongoose.Types.ObjectId[];
}