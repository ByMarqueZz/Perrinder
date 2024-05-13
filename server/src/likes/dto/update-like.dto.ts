import { PartialType } from '@nestjs/swagger';
import { CreateLikeDto } from './create-like.dto';

export class UpdateLikeDto extends PartialType(CreateLikeDto) {
    user1Id: number;
    user2Id: number;
}
