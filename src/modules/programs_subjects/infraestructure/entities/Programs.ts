
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Programs {
    @PrimaryGeneratedColumn()
    id_programs!: number;
    @Column({ type: "varchar"})
    name_programs!: string;
    @Column({ type: "int"})
    id_subject!: number;

}