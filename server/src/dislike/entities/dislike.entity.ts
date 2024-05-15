import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'dislike' })
export class Dislike {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @OneToOne(() => User, (user) => user.id)
    user1Id: number;

    @Column()
    @OneToOne(() => User, (user) => user.id)
    user2Id: number;
}
