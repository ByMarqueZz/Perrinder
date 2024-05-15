import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Photo } from 'src/photos/entities/photo.entity';
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
  ) { }

  async create(createPetDto: CreatePetDto, userId: User['id']) {
    // comprobamos que el usuario no tenga ya un pet
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['pets'] });
    if (user.pets.length > 0) {
      throw new HttpException('User already has a pet', HttpStatus.BAD_REQUEST);
    }
    // separamos las fotos del resto de los datos
    const { photos, ...rest } = createPetDto;
    // creamos el pet con los datos restantes
    const createPet = this.petRepository.create(rest);
    const newPet = await this.petRepository.save(createPet);
    // si hay fotos, las guardamos
    if (photos) {
      photos.forEach(async (photoUrl) => {
        const newPhoto = this.photoRepository.create({
          path: photoUrl,
          pet: newPet,
        });
        await this.photoRepository.save(newPhoto);
      });
    }
    return newPet;
  }

  /**
   * Filtramos los pets para que no salgan:
   * los que ya le ha dado like o dislike o
   * su propio pet
   * @param id userId que consulta ver pets
   * @returns Pet[] pets para mostrar en la app
   */
  async findAll(id: string): Promise<Pet[]> {
    const petsWithPhotos = await this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.photos', 'photo')
      .innerJoinAndSelect('pet.user', 'user')
      .where('user.id != :id', { id })
      .getMany();
    
    // filtramos los pets que ya le ha dado like o dislike
    const likes = await this.likeRepository.find({ where: { user1Id: +id } });
    const petsFull = petsWithPhotos.filter(pet => {
      return !likes.some(like => like.user2Id === pet.user.id);
    })
  
    return petsFull;
  }
  

  findOne(id: number) {
    const exists = this.petRepository.findOne({ where: { id } });
    if (!exists) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    return this.petRepository.findOne({ where: { id }, relations: ['photos'] });
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    const exists = this.petRepository.findOne({ where: { id } });
    if (!exists) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { photos, ...rest } = updatePetDto;
    const updatedPet = Object.assign(exists, rest);
    return this.petRepository.update(id, updatedPet);
  }

  remove(id: number) {
    const exists = this.petRepository.findOne({ where: { id } });
    if (!exists) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    return this.petRepository.delete({ id });
  }
}
