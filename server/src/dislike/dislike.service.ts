import { Injectable } from '@nestjs/common';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dislike } from './entities/dislike.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DislikeService {
  constructor(@InjectRepository(Dislike) private dislikeservice: Repository<Dislike>) {}
  create(createDislikeDto: CreateDislikeDto) {
    const dislike = this.dislikeservice.create(createDislikeDto);
    return this.dislikeservice.save(dislike);
  }

  findAll() {
    return this.dislikeservice.find();
  }

  findOne(id: number) {
    const dislike = this.dislikeservice.findOne({where: {id: id}});
    return dislike;
  }

  update(id: number, updateDislikeDto: UpdateDislikeDto) {
    return this.dislikeservice.update(id, updateDislikeDto);
  }

  remove(id: number) {
    return this.dislikeservice.delete(id);
  }
}
