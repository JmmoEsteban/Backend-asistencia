import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"; // en este archivo estamos haciendo el mapeo de la base de datos exportamos la clase para ser usada posteriormente 
import { Program } from "../../../programs/infraestructure/entities/Program";

@Entity('groups')// usamos el decorador entity
export class Group{
    @PrimaryGeneratedColumn()
    id_group!: number;
    
    @Column({type:"varchar",length:15})
    access_code_group!:string;

    @Column({type:"int"})
    id_subjects!:number;

    @Column({type:"int"})
    id_promotions!:number;

    @Column({type:"int"})
    id_programs!:number;

    @Column({type:"int"})
    status_group!:number;

    @ManyToOne(() => Program)
    @JoinColumn({ name: "id_programs" })
    program!: Program;
}