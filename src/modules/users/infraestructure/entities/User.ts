import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Programs } from '../../../programs/infraestructure/entities/Programs';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: "character varying", length: 150, nullable: false})
    first_name!:string;
    
    @Column({type: "character varying", length: 150, nullable:false})
    last_name!:string;
    
    @Column({type: "character varying", length: 255, nullable:false, unique: true})
    email!:string;

    @Column({type: "character varying", nullable:true, length: 255})
    password!:string;

    @Column({type: "character varying", nullable:true, length: 255})
    microsoft_id!:string;
    
    @Column({type: "character varying", nullable:false, length: 20, default: 'local'})
    auth_provider!:string;
    
    @Column({type: "character varying", nullable:true, length: 150})
    job_title!:string;

    @Column({type: "character varying", nullable:true, length: 150})
    department!:string;

    @Column({type: "character varying", nullable:true, length: 150})
    office_location!:string;

    @Column({type: "character varying", nullable:true, length: 50})
    mobile_phone!:string;

    @Column({type: "character varying", nullable:true})
    business_phones!:string;

    @Column({type: "jsonb", nullable:true})
    permissions!:JSON;
    
    @Column({type: "integer", nullable:false})
    role_id!:number;

    @ManyToOne(()=> Programs)
    @JoinColumn({name: "program_id"})
    Program:Programs;

    @Column({type: "integer", nullable:false})
    status_id!:number;

    @Column({type: "timestamp", nullable:false, default: () => "CURRENT_TIMESTAMP"})
    created_at!:Date;
}