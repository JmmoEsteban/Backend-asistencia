import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subjects')
export class Subjects {
    @PrimaryGeneratedColumn()
    id_subject!: number;
    @Column({ type: "varchar"})
    name_subject!: string;
    @Column({ type: "int"})
    status_subject!: number;
}