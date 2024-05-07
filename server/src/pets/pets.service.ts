import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Photo } from 'src/photos/entities/photo.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) { }

  async create(createPetDto: CreatePetDto) {
    // separamos las fotos del resto de los datos
    const { photos, ...rest } = createPetDto;
    // creamos el pet con los datos restantes
    const createPet = this.petRepository.create(rest);
    const newPet = await this.petRepository.save(createPet);
    // si hay fotos, las guardamos
    if (photos) {
      photos.forEach(async (photoUrl) => {
        const savedPhotoPath = await this.savePhotos(photoUrl, newPet.id);
        const newPhoto = this.photoRepository.create({
          path: savedPhotoPath,
          pet: newPet,
        });
        await this.photoRepository.save(newPhoto);
      });
    }
    return newPet;
  }

  async savePhotos(photoUrl: string, id: number): Promise<string> {
    // Eliminar el prefijo "file://" de la URL
    const filePath = photoUrl.replace('file://', '');

    try {
      // Leer el archivo desde la ruta local
      const photoData = fs.readFileSync(filePath);

      const res = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: JSON.stringify({
          key: 'f0a62074f96665b245a56bbd67a78c6e',
          image: photoData.toString('base64'),
        }),
      })
      const data = await res.json();
      console.log(data)
      return data.data.url;
    } catch (error) {
      console.error('Error al guardar la foto:', error);
      throw error;
    }
  }

  async findAll() {
    const petsWithPhotos = await this.petRepository.find({
      relations: ['photos'],
    });

    const petsWithFiles = await Promise.all(
      petsWithPhotos.map(async (pet) => {
        const photosWithFiles = await Promise.all(
          pet.photos.map(async (photo) => {
            const file = await this.readFile(photo.path);
            return { ...photo, file };
          }),
        );

        return { ...pet, photos: photosWithFiles };
      }),
    );

    return petsWithFiles;
  }

  async readFile(photoPath: string) {
    const allPath = path.join(__dirname, '..', '..', 'uploads', photoPath);
    const data = fs.readFileSync(allPath, { encoding: 'base64' });
    const type = data.endsWith('/9j/') ? 'image/jpeg' : 'image/png';
    const blob = Buffer.from(data, 'base64'); // Using Buffer.from() instead of Blob

    return { data: blob, type };
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
