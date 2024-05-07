import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) {}

  create(createPhotoDto: CreatePhotoDto) {
    const newPhoto = this.photoRepository.create(createPhotoDto);
    return this.photoRepository.save(newPhoto);
  }

  findAll() {
    return this.photoRepository.find({});
  }

  findOne(id: number) {
    const photoFind = this.photoRepository.findOne({ where: { id } });
    if (!photoFind) {
      throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
    }
    return photoFind;
  }

  remove(id: number) {
    const photoExists = this.photoRepository.findOne({ where: { id } });
    if (!photoExists) {
      throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
    }
    return this.photoRepository.delete({ id });
  }
}
