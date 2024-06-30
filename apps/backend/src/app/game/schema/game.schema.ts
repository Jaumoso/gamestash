import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

export type GameDocument = Game & Document;

@Schema()
export class Game {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop()
    released: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Developer'})
    developer: mongoose.Schema.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Publisher'})
    publisher: mongoose.Schema.Types.ObjectId;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}]})
    genre: mongoose.Schema.Types.ObjectId[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Franchise'})
    franchise: mongoose.Schema.Types.ObjectId;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Platform'}]})
    platform: mongoose.Schema.Types.ObjectId[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Storefront'}]})
    storefront: mongoose.Schema.Types.ObjectId[];
}
export const GameSchema = SchemaFactory.createForClass(Game);