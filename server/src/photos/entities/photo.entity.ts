import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from '../../pets/entities/pet.entity';

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  path: string;

  @ManyToOne(() => Pet, (pets) => pets.photos)
  pet: Pet;
}
