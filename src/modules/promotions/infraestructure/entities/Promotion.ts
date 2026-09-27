import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Programs } from "../../../programs/infraestructure/entities/Programs";
// import { Program } from "../../../programs/infraestructure/entities/Program";

@Entity('promotions')
export class Promotion {
    @PrimaryGeneratedColumn()
    id_promotion!: number;

    @Column({ type: "varchar", length: 150 })
    name_promotion!: string;

    @Column({ type: "int" })
    id_programs!: number;

    @Column({ type: "int" })
    status_promotions!: number;
}
