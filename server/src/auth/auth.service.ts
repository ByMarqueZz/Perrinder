import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const userExist = await this.userRepository.findOne({
      where: { email, password },
    });
    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const plainToHash = await hash(password, 10);

    const newUser = this.authRepository.create({
      email,
      password: plainToHash,
    });

    this.authRepository.save(newUser);
  }

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    let userFound = await this.authRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      await this.create(createAuthDto);
      userFound = await this.authRepository.findOne({
        where: { email },
      });
    }
    const checkPassword = await compare(password, userFound.password);
    if (!checkPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { id: userFound.id };
    const token = this.jwtService.sign(payload);
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if(!user){
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = {
      user: user,
      token: token,
    }
    return data;
  }
}
