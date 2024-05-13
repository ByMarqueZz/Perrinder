import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiBody({ type: CreatePetDto })
  @ApiResponse({
    status: 201,
    description: 'The pet has been successfully created.',
  })
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get(':user')
  @ApiResponse({ status: 200, description: 'Returns all pets.' })
  findAll(@Param('user') userId: string){
    return this.petsService.findAll(userId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the pet with the specified ID.',
  })
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePetDto })
  @ApiResponse({
    status: 200,
    description: 'The pet has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The pet has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
