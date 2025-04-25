import { Product } from 'src/products/entitys/entity.product';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column({
    type: 'enum',
    enum: ['USA','EU','LATAM'],
    default: 'LATAM',
    nullable: false
  })
  region: 'USA' | 'EU' | 'LATAM';

  @Column({
    type: 'enum',
    enum: ['hombre','mujer','niño'],
    default: 'hombre',
    nullable: false
  })
  type: 'hombre' | 'mujer' | 'niño';

  @ManyToMany(() => Product, product => product.sizes)
  products: Product[];
}
