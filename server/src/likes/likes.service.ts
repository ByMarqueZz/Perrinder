import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likerepository: Repository<Like>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createLikeDto: CreateLikeDto) {
    const like = this.likerepository.create(createLikeDto);
    const saveLike = await this.likerepository.save(like);
    const haslike = await this.likerepository.find({where: {user1Id: createLikeDto.user2Id, user2Id: createLikeDto.user1Id}});
    if(haslike.length === 0) {
      return saveLike;
    } else {
      return {saveLike, haslike};
    }
  }

/**
 * Muestra la lista de likes de un usuario, los likes que el da y los que le dan
 * @param id 
 * @returns 
 */
async findAll(id: number) {
  const user1idlist = await this.likerepository.find({ where: { user1Id: id } });
  const user2idlist = await this.likerepository.find({ where: { user2Id: id } });

  const mislikes = await Promise.all(user1idlist.map(async (like) => {
    const user = await this.userRepository.findOne({ where: { id: like.user2Id }, relations: ['pets', 'pets.photos'] });
    return { ...like, user };
  }));

  const losqlikequemedan = await Promise.all(user2idlist.map(async (like) => {
    const user = await this.userRepository.findOne({ where: { id: like.user1Id }, relations: ['pets', 'pets.photos']});
    return { ...like, user };
  }));

  return { mislikes, losqlikequemedan };
}


  /**
   * Busca un like en específico para saber si hay match
   * @param id 
   * @param position 
   * @returns 
   */
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
