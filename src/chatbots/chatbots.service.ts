import { Injectable } from '@nestjs/common';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { VenombotsService } from 'src/venombots/venombots.service';
import { GetQrCodeDto } from './dto/get-qrcode-dto';
import { Socket } from 'socket.io';
import { uuid } from 'uuidv4';

@Injectable()
export class ChatbotsService {

  constructor(
    private venomBotsService: VenombotsService,
    private connectedClients = new Map(),
  ) { }





  async getQrCode(getQrCodeDto: GetQrCodeDto) {
    const { sessionName, socket } = getQrCodeDto;
    const clientId = uuid();

    try {
      const client = await this.venomBotsService.createNewClient({ sessionName, socket });
      if (client) {
        this.connectedClients.set(clientId, { socket, session: client });
      }
    } catch (error) {
      console.error(error, "Tive erro");
      socket.emit(`errorQrCode-${sessionName}`, "Erro ao gerar o QR Code");
    }

  }

  create(createChatbotDto: CreateChatbotDto) {
    return 'This action adds a new chatbot';
  }

  findAll() {
    return `This action returns all chatbots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatbot`;
  }

  update(id: number, updateChatbotDto: UpdateChatbotDto) {
    return `This action updates a #${id} chatbot`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatbot`;
  }
}
