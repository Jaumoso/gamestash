import { PartialType } from '@nestjs/swagger';
import { CreateStorefrontDto } from './create-storefront.dto';
export class UpdateStorefrontDto extends PartialType(CreateStorefrontDto) {}