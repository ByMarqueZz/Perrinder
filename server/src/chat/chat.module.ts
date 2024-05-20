import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ChatRoom, Message } from './entities/chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ChatRoom, Message])],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
