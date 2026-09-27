import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("programs")
export class Program {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 150 })
    name!: string;
}
