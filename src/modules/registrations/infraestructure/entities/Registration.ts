import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:"number"})
    id_users!:number;

    @Column({type:"number"})
    id_groups!:number;

    @Column({type:"number"})
    status_registrations!:number;
}
