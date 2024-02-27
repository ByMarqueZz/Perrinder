import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// - Nombre del perro
// - Sexo del perro
// - Raza del perro
// - Tamaño (s, m, l y xl)
// - Localidad
// - Edad
// - Descripción
// - Fotos (máximo las que deje Tinder)
// + Gustos, aficiones, planes

@Entity({ name: 'pets'})
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
    color: string;

    @Column()
    weight: string;

    @Column()
    age: string;

    @Column()
    location: string;

    @Column()
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
