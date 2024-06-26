import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Photo, User, Like])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
