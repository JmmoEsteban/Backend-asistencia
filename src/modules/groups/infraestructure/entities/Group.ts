import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"; // en este archivo estamos haciendo el mapeo de la base de datos exportamos la clase para ser usada posteriormente 

@Entity('groups')// usamos el decorador entity
export class Group{
    @PrimaryGeneratedColumn()
    group_id!: number;
    
    @Column({type:"varchar",length:15})
    group_acces_code!:string;

    @Column({type:"int"})
    id_subjects!:number;

    @Column({type:"int"})
    id_promotion!:number;

    @Column({type:"int"})
    id_programs!:number;
}