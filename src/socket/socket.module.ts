import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
