import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column('varchar',{length:50})
    name:string

    @Column('varchar',{length:50})
    last_name:string

    @Column('varchar', { length: 255, nullable: true })  // Asegúrate de que `nullable: true` sea correcto
    descriptions: string;

    @Column('varchar',{length:50})
    email:string

    @Column()
    birthday:Date

    @Column('int',{width:10})
    identificacion:number

}