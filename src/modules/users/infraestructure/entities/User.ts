import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class User{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: "character varying", length: 200})
    nombre!:string;
    
    @Column({type: "character varying", length: 250, unique: true})
    email!:string;

    @Column({type: "character varying", nullable:true, length: 50,})
    telefono!:string;

    @Column({type: "character varying", nullable:true, length: 200})
    contraseña!:string;
    
    @Column({type: "character varying", length: 50})
    rol!:string;
    
    @Column({type: "integer", default: 1})
    status!:number;
}