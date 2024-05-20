import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private chatService: ChatService,
    @InjectRepository(User) private userService: Repository<User>,
  ) { }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody('roomId') roomId: number,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const chatRoom = await this.chatService.getChatRoom(roomId);
    client.join(`room-${chatRoom.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody('roomId') roomId: number,
    @MessageBody('message') message: string,
    @MessageBody('senderId') senderId: number,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    let chatRoom = await this.chatService.getChatRoom(roomId);
    if(!chatRoom) return null;
    const sender = await this.userService.findOne({ where: { id: senderId } });
    const savedMessage = await this.chatService.saveMessage(message, sender, chatRoom);
    this.server.to(`room-${chatRoom.id}`).emit('message', savedMessage);
  }
}
