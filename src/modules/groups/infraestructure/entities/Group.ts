import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"; // en este archivo estamos haciendo el mapeo de la base de datos exportamos la clase para ser usada posteriormente 
// import { Program } from "../../../programs/infraestructure/entities/Program";
import { Promotion } from "../../../promotions/infraestructure/entities/Promotion";
import { Programs } from "../../../programs/infraestructure/entities/Programs";
import { Subjects } from "../../../subjects/infraestructure/entities/Subjects";

@Entity('groups')// usamos el decorador entity
export class Group{
    @PrimaryGeneratedColumn()
    id_group!: number;
    
    @Column({type:"varchar",length:15})
    access_code_group!:string;

    @ManyToOne(() => Promotion)
    @JoinColumn({ name: "id_promotion" })
    Promotion!:Promotion;

    @ManyToOne(() => Programs)
    @JoinColumn({ name: "id_programs" })
    Programs!:Programs;

    @ManyToOne(() => Subjects)
    @JoinColumn({ name: "id_subjects" })
    Subjects!:Subjects;

    @Column({type:"int"})
    status_group!:number;
}