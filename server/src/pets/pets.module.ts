import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Photo])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
