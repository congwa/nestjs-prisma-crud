import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  public socket: Server;
  private logger: Logger = new Logger('RoomsService');

  private prefix = 'ROOM';
  createRoomName = (name: string) => `${this.prefix}-${name}`;
  isCustomRoom = (name: string) => name.startsWith(this.prefix);
  parceRoomName = (name: string) => name.split('-')[1];

  async getUsersInRoom(rooms: Set<string>) {
    const users = await this.socket.of('/').adapter.fetchSockets({
      rooms,
    });
    return users.map((s) => s.data) as { id: string; account: string }[];
  }

  onRoomChange() {
    this.socket.of('/webapp').adapter.on('create-room', (room) => {
      if (this.isCustomRoom(room)) {
        this.socket.emit('create-room', room);
      }
      this.logger.log(`room ${room} was created`);
    });

    this.socket.of('/webapp').adapter.on('join-room', (room, id) => {
      if (this.isCustomRoom(room)) {
        this.socket.to(room).emit('join-room', id);
      }
      this.logger.log(`socket ${id} has joined room ${room}`);
    });

    this.socket.of('/webapp').adapter.on('leave-room', (room, id) => {
      this.socket.to(room).emit('leave-room', id);
      this.logger.log(`socket ${id} has leaved room ${room}`);
    });
  }
}
