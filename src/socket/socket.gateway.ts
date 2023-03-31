import { SocketService } from './socket.service';
import { Server, Socket, Namespace } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { instrument } from '@socket.io/admin-ui';
import { hashSync } from 'bcryptjs';

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

const PORT = parseInt(process.env.SOCKET_PORT || '3001', 10);

@Injectable()
@WebSocketGateway(PORT, {
  //https://socket.io/docs/v4/handling-cors/
  cors: {
    origin: ['http://localhost:8080', 'https://admin.socket.io'],
    credentials: true,
  },
  allowEIO3: true,
  path: '/socket.io',
  auth: false,
  namespace: '/webapp',
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Namespace;
  private logger: Logger = new Logger(SocketGateway.name);
  private AUTH = {
    username: process.env.SOCKET_ADMIN_USERNAME || 'admin',
    // Auto-gen a salt and hash:
    password: hashSync(process.env.SOCKET_ADMIN_PASSWORD || '123456', 10),
  };
  constructor(private roomService: SocketService) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.log(`Message received: ${payload} from client: ${client.id}`);
    this.server.emit('message', 'mes from default event handleMsg');
    return 'Hello world!';
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    this.logger.log(`Client ${client.id} join to room (${room})`);
    client.join(room);
    client.emit('checkRoom', 'you joined');
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    this.logger.log(`Client ${client.id} leave room (${room})`);
    client.leave(room);
    client.emit('checkRoom', 'you left');
  }

  joinRoomHook() {
    this.server.server.of('/webapp').adapter.on('create-room', (room) => {
      console.log(`room ${room} was created`);
    });
  }

  afterInit(server: Server) {
    // https://admin.socket.io/#/
    instrument(this.server.server, {
      auth: {
        type: 'basic',
        ...this.AUTH,
      },
      namespaceName: 'admin',
    });
    this.roomService.socket = this.server.server;
    this.roomService.onRoomChange();
    this.logger.warn(`Socket.io server listening on port ${PORT}`);
    // console.log('server.path', server);
    // this.logger.log(server.sockets.sockets.size);
    this.logger.log('Socket.io First Init');
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(
    //   `(CLIENT TOTAL NUMBER:${this.server.server.engine.clientsCount - 1}) ` +
    //     'Client disconnected:' +
    //     client.id,
    // );
    client.disconnect();
    client.removeAllListeners();
  }

  // every new client connect will hook
  handleConnection(client: Socket) {
    //before handleDisconnect
    client.on('disconnect', (reason) => {
      this.logger.warn(`disconnect reason :  ${reason}`);
    });

    // this.logger.log(
    //   `(CLIENT TOTAL NUMBER:${this.server.server.engine.clientsCount}) Client connected: ${client.id}`,
    // );
  }
}
