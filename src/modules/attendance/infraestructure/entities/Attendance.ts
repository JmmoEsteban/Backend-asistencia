import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "../../../session/infraestructure/entities/Session";
import { User } from "../../../users/infraestructure/entities/User";

@Entity('attendances')
export class Attendance {
    @PrimaryGeneratedColumn()
    id_attendances!: number;
    @Column({ type: "date"})
    date_attendances!: string;
    @ManyToOne(() => User)
    @JoinColumn({ name: "id_user"})
    User!: User;
    @ManyToOne(() => Session)
    @JoinColumn({ name: "id_session"})
    Session!: Session;
    @Column({ type: "int"})
    status_attendances!: number;
}