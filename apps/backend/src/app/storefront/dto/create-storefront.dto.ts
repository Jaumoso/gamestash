import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStorefrontDto {

    @ApiProperty({
        type: String, 
        description: 'Nombre de la tienda.',
        example: "name"
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String, 
        description: 'Descripción de la tienda.',
        example: "description"
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        type: String, 
        description: 'Imagen de la tienda.',
        example: "assets/image.jpg"
    })
    @IsNotEmpty()
    @IsString()
    image: string;
}