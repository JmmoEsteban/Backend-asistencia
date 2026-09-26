import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("promotions")
export class Promotion {
    @PrimaryGeneratedColumn()
    promotion_id!: number;

    @Column({ type: "varchar", length: 150 })
    promotion_name!: string;

    @Column({ type: "int" })
    id_programs!: number;
}
