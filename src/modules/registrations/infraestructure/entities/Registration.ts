import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../users/infraestructure/entities/User';
import { Group } from '../../../groups/infraestructure/entities/Group';

@Entity('registrations')
export class Registration{
    @PrimaryGeneratedColumn()
    id_registrations!:number;

    @ManyToMany(()=> User)
    @JoinColumn({name:"id"})
    User!:User;

    @ManyToMany(()=> Group)
    @JoinColumn({name:"id_group"})
    Groups!:Group;

    @Column({type:"integer"})
    status_registrations!:number;
}
