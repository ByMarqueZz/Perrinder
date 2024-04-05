import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Photo } from 'src/photos/entities/photo.entity';
import savePhotos from './services/savePhotos';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>
  ) {}

  create(createPetDto: CreatePetDto) {
    // separamos las fotos del resto de los datos
    const {photos, ...rest} = createPetDto;
    console.log({photos, rest})
    // creamos el pet con los datos restantes
    const newPet = this.petRepository.create(rest);
    this.petRepository.save(newPet);
    console.log('Mascota creada correctamente')
    // si hay fotos, las guardamos
    if (photos) {
      photos.forEach(async (photo) => {
        const path = await savePhotos(photo, newPet);
        console.log({path})
        const newPhoto = this.photoRepository.create({path: path, pet: newPet});
        await this.photoRepository.save(newPhoto);
      });
    }
    return newPet;
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
    const {photos, ...rest} = updatePetDto;
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
