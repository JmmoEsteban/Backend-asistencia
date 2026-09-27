import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import { Programs } from "../../../programs/infraestructure/entities/Programs";
import { Subjects } from "../../../subjects/infraestructure/entities/Subjects";


@Entity('programs_subjects')
export class Programs_subjects{
    @PrimaryGeneratedColumn()
    id_programs_subjects!:number;

    @Column({type: "int"})
    id_programs:number;

    @Column({type: "int"})
    id_subject:number;

    @ManyToOne(()=>Programs)
    @JoinColumn({name:"programs_id"})
    Programs!:Programs;

    @ManyToOne(()=>Subjects)
    @JoinColumn({name:"subjects_id"})
    Subjects!:Subjects;

    @Column({type:"integer"})
    status_programs_subjects!:number;
}
