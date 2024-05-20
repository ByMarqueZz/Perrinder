import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './entities/chat.entity';
import { Message } from './entities/chat.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userService: Repository<User>,
  ) {}

  async createChatRoom(user1Id: number, user2Id: number): Promise<ChatRoom> {
    const user1 = await this.userService.findOne({ where: { id: user1Id } });
    const user2 = await this.userService.findOne({ where: { id: user2Id } });
    const chatRoom = this.chatRoomRepository.create({ user1, user2 });
    return this.chatRoomRepository.save(chatRoom);
  }

  async getChatRoom(id: number): Promise<ChatRoom> {
    return this.chatRoomRepository.findOne({ where: { id }, relations: ['messages'] });
  }

  async getUserChatRooms(userId: number): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      where: [
        { user1: { id: userId } },
        { user2: { id: userId } }
      ],
      relations: ['user1', 'user2', 'messages'],
    });
  }

  async saveMessage(content: string, sender: User, chatRoom: ChatRoom): Promise<Message> {
    const message = this.messageRepository.create({ content, sender, chatRoom });
    return this.messageRepository.save(message);
  }

  async getMessages(chatRoom: ChatRoom): Promise<Message[]> {
    return this.messageRepository.find({ where: { chatRoom }, relations: ['sender'] });
  }
}
