import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
  ) {}

  create(createPetDto: CreatePetDto) {
    const newPet = this.petRepository.create(createPetDto);
    return this.petRepository.save(newPet);
  }

  findAll() {
    return this.petRepository.find({relations: ['photos'] });
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
    const updatedPet = Object.assign(exists, updatePetDto);
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
