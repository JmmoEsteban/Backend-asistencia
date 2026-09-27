import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: "character varying", length: 100, nullable: false, unique: true})
    name!:string;
}