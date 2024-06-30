import { Module } from '@nestjs/common';
import { IgdbService } from './igdb.service';

@Module({
  providers: [IgdbService],
})
export class IgdbModule {}
