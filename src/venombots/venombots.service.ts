import { Injectable } from '@nestjs/common';
import { CreateVenombotDto } from './dto/create-venombot.dto';
import { UpdateVenombotDto } from './dto/update-venombot.dto';
import { create, Whatsapp } from 'venom-bot';

@Injectable()
export class VenombotsService {
  async createNewClient(createVenombotDto: CreateVenombotDto) {
    const { sessionName, socket } = createVenombotDto;
    // console.log(createVenombotDto);
    try {
      const client = await create(
        { session: sessionName } as any,
        (base64Qrimg, asciiQR, attempts, urlCode) => {
          // console.log('Number of attempts to read the qrcode: ', attempts);
          // console.log('Terminal qrcode: ', asciiQR);
          // console.log('base64 image string qrcode: ', base64Qrimg);
          // console.log('urlCode (data-ref): ', urlCode);
          socket.emit(`qrCode`, {
            qrCode: base64Qrimg,
            sessionId: sessionName,
          });
        },
        async (statusSession, session) => {
          console.log('Status Session: ', statusSession);

          switch (statusSession) {
            case 'successChat':
              socket.emit(`sucessChat-${sessionName}`, 'Conectado');
              break;
            case 'qrReadSuccess':
              socket.emit(`qrReadSuccess`, { sessionId: sessionName });
              break;
            case 'desconnectedMobile':
              socket.emit(`wppDisconnected`, { sessionId: sessionName });
              break;
            case 'autocloseCalled':
              console.log(
                `Sessão ${sessionName} fechada devido a falhas na leitura do QR code`,
              );
              socket.emit(`qrCodeFail-${sessionName}`, 'Sessão finalizada!');
              break;
          }
          socket.emit(`${statusSession}-${sessionName}`, statusSession);
          // console.log('Session name: ', statusSession);
        },
        {
          folderNameToken: 'tokens',
          headless: 'new',
          devtools: false,
          debug: false,
          logQR: true,
          disableSpins: true,
          disableWelcome: true,
          updatesLog: true,
          autoClose: 15000,
          createPathFileToken: true,
          addBrowserArgs: [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
          ],
        },
      );
      return client;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all venombots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venombot`;
  }

  update(id: number, updateVenombotDto: UpdateVenombotDto) {
    return `This action updates a #${id} venombot`;
  }

  remove(id: number) {
    return `This action removes a #${id} venombot`;
  }
}
