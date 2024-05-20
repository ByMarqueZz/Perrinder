import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @Post('room')
  async createChatRoom(@Body('user1Id') user1Id: number, @Body('user2Id') user2Id: number) {
    return this.chatService.createChatRoom(user1Id, user2Id);
  }

  @Get('room/:id')
  async getChatRoom(@Param('id') id: number) {
    return this.chatService.getChatRoom(id);
  }

  @Get('room/:id/messages')
  async getMessages(@Param('id') id: number) {
    const chatRoom = await this.chatService.getChatRoom(id);
    return this.chatService.getMessages(chatRoom);
  }

  @Get('rooms/:userId')
  async getUserChatRooms(@Param('userId') userId: number) {
    return this.chatService.getUserChatRooms(userId);
  }
}
