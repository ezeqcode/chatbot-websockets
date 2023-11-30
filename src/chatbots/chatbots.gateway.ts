import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ChatbotsService } from './chatbots.service';
import { Server, Socket } from 'socket.io';
import { GetQrCodeDto } from './dto/get-qrcode-dto';

@WebSocketGateway(3070, {
  cors: {
    origin: '*',
  },
})
export class ChatbotsGateway {
  constructor(private readonly chatbotsService: ChatbotsService) { }
  @WebSocketServer() server: Server = new Server();

  @SubscribeMessage('getQRCode')
  async getQrCode(@MessageBody() sessionName: string) {
    const getQrCodeDto: GetQrCodeDto = {
      sessionName: sessionName,
      socket: this.server
    }
    await this.chatbotsService.getQrCode(getQrCodeDto);
  }


}
