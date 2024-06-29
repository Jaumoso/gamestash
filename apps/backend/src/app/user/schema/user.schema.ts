import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { mongo } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    username: string;

    @Prop()
    password: string;

/*     @Prop()
    profilePic: string; */

    @Prop()
    joined: Date;

    @Prop()
    lastSeen: Date;

    @Prop({type: [{
        gameId: Number, 
        name: String,
        releaseDate: Date,
        cover: String,
        rating: Number,
        platforms: [String],
        storefronts: [String],
        acquisitionDate: Date,
        acquisitionPrice: Number,
        own: Boolean,
        format: String,
        state: String,
        time: Number,
        comment: String
    }]})
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
export const UserSchema = SchemaFactory.createForClass(User);