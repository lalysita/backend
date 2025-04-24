import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 255 })
    description: string;

    @Column('int')
    stock: number;

    
    @ManyToOne(() => User, user => user.products) 
    @JoinColumn({ name: 'user_id' })
    user: User;
}