import { Module } from '@nestjs/common';
import { VenombotsService } from './venombots.service';

@Module({
  controllers: [],
  providers: [VenombotsService],
  exports: [VenombotsService]
})
export class VenombotsModule {}
