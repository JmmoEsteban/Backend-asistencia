
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Programs {
    @PrimaryGeneratedColumn()
    id_programs!: number;
    @Column({ type: "varchar"})
    name_programs!: string;
    @Column({ type: "int"})
    status_programs!: number;
}