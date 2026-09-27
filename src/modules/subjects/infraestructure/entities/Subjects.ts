import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subjects {
    @PrimaryGeneratedColumn()
    id_subjects!: number;
    @Column({ type: "varchar"})
    name_subjects!: string;
    @Column({ type: "int"})
    status_subjects!: number;
}