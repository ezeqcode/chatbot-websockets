import { Module } from '@nestjs/common';
import { ChatbotsService } from './chatbots.service';
import { ChatbotsGateway } from './chatbots.gateway';
import { VenombotsModule } from 'src/venombots/venombots.module';

@Module({
  imports: [VenombotsModule],
  providers: [ChatbotsGateway, ChatbotsService],
})
export class ChatbotsModule {}
