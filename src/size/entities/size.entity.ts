import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Product } from 'src/products/entitys/entity.product';



@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    size: string;

    @ManyToMany(() => Product, product => product.sizes)
    products: Product[];
}