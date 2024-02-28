import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepositry: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    // se comprueba si el usuario existe
    const userExist = await this.userRepositry.findOne({
      where: { email: user.email },
    });
    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.FOUND);
    }

    const newUser = this.userRepositry.create(user);
    return this.userRepositry.save(newUser);
  }

  getAllUsers() {
    return this.userRepositry.find({});
  }

  async getUserById(id: number) {
    const userFound = await this.userRepositry.findOne({ where: { id: id }});
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  updateUser(id: number, user: UpdateUserDto) {
    const userFound = this.userRepositry.findOne({ where: { id } });
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = Object.assign(userFound, user);
    return this.userRepositry.update(id, updatedUser);
  }

  async deleteUser(id: number) {
    const userFound = await this.userRepositry.findOne({ where: { id: id } });
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepositry.delete({ id });
  }
}
