import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('registrations')
export class Registration{
    @PrimaryGeneratedColumn()
    id_registrations!:number;

    @Column({type:"integer"})
    id_users!:number;

    @Column({type:"integer"})
    id_groups!:number;

    @Column({type:"integer"})
    status_registrations!:number;
}
