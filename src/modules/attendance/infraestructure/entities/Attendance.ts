import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id_attendance!: number;
    @Column({ type: "date"})
    date_attendance!: Date;
    @Column({ type: "int"})
    id_user!: number;
    @Column({ type: "int"})
    id_session!: number;
    @Column({ type: "int"})
    status_attendance!: number;
}