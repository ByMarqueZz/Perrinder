import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiBody({ type: CreateLikeDto })
  @ApiResponse({
    status: 201,
    description: 'The like has been successfully created.',
  })
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get('/all/:id')
  @ApiResponse({ status: 200, description: 'Returns all likes.' })
  findAll(@Param('id') id: string) {
    return this.likesService.findAll(+id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the like with the specified ID.',
  })
  findOne(@Param('id') id: string, @Param('position') position: 0 | 1) {
    return this.likesService.findOne(+id, position);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateLikeDto })
  @ApiResponse({
    status: 200,
    description: 'The like has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The like has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
