
import { Size } from 'src/size/entities/size.entity';
import { User } from 'src/users/entities/user.entity';

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 100 })
    name: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({ type: 'int' })
    stock: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
      price: number;
  
    @ManyToOne(() => User, (user) => user.products)
    user: User;
  
    @JoinTable()
    @ManyToMany(()=> Size, (size) => size.products)
    sizes: Size[];
}