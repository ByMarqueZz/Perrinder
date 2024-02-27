import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('')
  getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

}
