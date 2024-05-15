import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likerepository: Repository<Like>,
  ) {}
  async create(createLikeDto: CreateLikeDto) {
    const like = await this.likerepository.create(createLikeDto);
    const saveLike = await this.likerepository.save(like);
    const haslike = await this.likerepository.find({where: {user1Id: createLikeDto.user2Id, user2Id: createLikeDto.user1Id}});
    if(haslike.length === 0) {
      return saveLike;
    } else {
      return {saveLike, haslike};
    }
  }

  findAll() {
    return this.likerepository.find();
  }

  findOne(id: number, position: 0 | 1) {
    if(position === 0) {
      return this.likerepository.find({where: {user1Id: id}});
    } else {
      return this.likerepository.find({where: {user2Id: id}});
    }
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return this.likerepository.update(id, updateLikeDto);
  }

  remove(id: number) {
    return this.likerepository.delete(id);
  }
}
