import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../../groups/infraestructure/entities/Group";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id_session!: number;
    @Column({ type: "date"})
    date_session!: Date;
    @Column({ type: "int"})
    day_session!: number;
    @JoinColumn({ name: "groups"})
    @ManyToOne(() => Group)
    id_group!: number;
    @Column({ type: "int"})
    status_session!: number;
}