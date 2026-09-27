import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../../groups/infraestructure/entities/Group";

@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn()
    id_session!: number;
    @Column({ type: "date"})
    date_session!: Date;
    @Column({ type: "int"})
    day_session!: number;
    @JoinColumn({ name: "id_group"})
    @ManyToOne(() => Group)
    Group!: Group;
    @Column({ type: "int"})
    status_session!: number;
}