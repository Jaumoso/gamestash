import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type StorefrontDocument = Storefront & Document;

@Schema()
export class Storefront {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    image: string;
}
export const StorefrontSchema = SchemaFactory.createForClass(Storefront);