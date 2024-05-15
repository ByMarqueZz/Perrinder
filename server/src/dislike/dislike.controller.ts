import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DislikeService } from './dislike.service';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';
import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('dislike')
@Controller('dislike')
export class DislikeController {
  constructor(private readonly dislikeService: DislikeService) {}

  @ApiBody({ type: CreateDislikeDto })
  @ApiResponse({
    status: 201,
    description: 'The like has been successfully created.',
  })
  @Post()
  create(@Body() createDislikeDto: CreateDislikeDto) {
    return this.dislikeService.create(createDislikeDto);
  }

  @ApiResponse({ status: 200, description: 'Returns all dislikes.' })
  @Get()
  findAll() {
    return this.dislikeService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the dislike with the specified ID.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dislikeService.findOne(+id);
  }

  @ApiBody({ type: UpdateDislikeDto })
  @ApiResponse({
    status: 200,
    description: 'The dislike has been successfully updated.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDislikeDto: UpdateDislikeDto) {
    return this.dislikeService.update(+id, updateDislikeDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The dislike has been successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dislikeService.remove(+id);
  }
}
