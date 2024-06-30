import { Module } from '@nestjs/common';
import { StorefrontService } from './storefront.service';
import { StorefrontController } from './storefront.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StorefrontSchema } from './schema/storefront.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Storefront', schema: StorefrontSchema }]),],
  providers: [StorefrontService],
  controllers: [StorefrontController],
})
export class StorefrontModule {}
