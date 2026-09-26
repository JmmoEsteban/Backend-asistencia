import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "../../../session/infraestructure/entities/Session";
import { User } from "../../../users/infraestructure/entities/User";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id_attendance!: number;
    @Column({ type: "date"})
    date_attendance!: Date;
    @ManyToOne(() => User)
    @JoinColumn({ name: "id_user"})
    id_user!: User;
    @ManyToOne(() => Session)
    @JoinColumn({ name: "id_session"})
    id_session!: Session;
    @Column({ type: "int"})
    status_attendance!: number;
}