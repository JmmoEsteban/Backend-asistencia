import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Programs } from "../../../programs/infraestructure/entities/Programs";
// import { Program } from "../../../programs/infraestructure/entities/Program";

@Entity('promotions')
export class Promotion {
    @PrimaryGeneratedColumn()
    id_promotion!: number;

    @Column({ type: "varchar", length: 150 })
    name_promotion!: string;
    
    @ManyToOne(()=>Programs)
    @JoinColumn({ name: "id_programs" })
    Programs!: Programs;

    @Column({ type: "int" })
    status_promotions!: number;
}
