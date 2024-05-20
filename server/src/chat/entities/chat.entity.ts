import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  @Entity({ name: 'chat_rooms' })
  export class ChatRoom {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User)
    user1: User;
  
    @ManyToOne(() => User)
    user2: User;
  
    @OneToMany(() => Message, (message) => message.chatRoom)
    messages: Message[];
  
    @CreateDateColumn()
    createdAt: Date;
  }
  
  @Entity({ name: 'messages' })
  export class Message {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;
  
    @ManyToOne(() => User)
    sender: User;
  
    @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
    chatRoom: ChatRoom;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  