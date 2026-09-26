import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id_session!: number;
    @Column({ type: "date"})
    date_session!: Date;
    @Column({ type: "int"})
    day_session!: number;
    @Column({ type: "int"})
    id_group!: number;
    @Column({ type: "int"})
    status_session!: number;
}