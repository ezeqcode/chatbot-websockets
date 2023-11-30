import { Socket, Server } from "socket.io";

export class GetQrCodeDto{
    sessionName: string;
    socket: Server
}