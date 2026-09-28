import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../users/infraestructure/entities/User';
import { Group } from '../../../groups/infraestructure/entities/Group';

@Entity('registrations')
export class Registration{
    @PrimaryGeneratedColumn()
    id_registrations!:number;

    @ManyToOne(()=> User)
    @JoinColumn({name:"id_users"})
    User!:User;

    @ManyToOne(()=> Group)
    @JoinColumn({name:"id_groups"})
    Group!:Group;

    @Column({type:"integer"})
    status_registrations!:number;
}
