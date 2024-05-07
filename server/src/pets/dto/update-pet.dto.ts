import { PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  name: string;
  gender: string;
  breed: string;
  color: string;
  weight: string;
  age: string;
  location: string;
  description: string;
  photos?: string[];
}
