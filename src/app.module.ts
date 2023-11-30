import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotsModule } from './chatbots/chatbots.module';
import { VenombotsModule } from './venombots/venombots.module';

@Module({
  imports: [ChatbotsModule, VenombotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
