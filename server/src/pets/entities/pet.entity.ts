import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Photo } from '../../photos/entities/photo.entity';

// - Nombre del perro
// - Sexo del perro
// - Raza del perro
// - Tamaño (s, m, l y xl)
// - Localidad
// - Edad
// - Descripción
// - Fotos (máximo las que deje Tinder)
// + Gustos, aficiones, planes

@Entity({ name: 'pets' })
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  breed: string;

  @Column()
  weight: string;

  @Column()
  age: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.pets)
  user: User;

  @OneToMany(() => Photo, (photo) => photo.pet)
  photos: Photo[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
