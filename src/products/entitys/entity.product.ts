import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    name: string;

    @Column('varchar', { length: 255, nullable: true }) // Asegúrate de que `nullable: true` sea correcto
    description: string;

    @Column('int', { width: 10 })
    stock: number;
}