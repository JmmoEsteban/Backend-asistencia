import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: "character varying", length: 100, nullable: false, unique: true})
    name!:string;
}

// id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     password: string;
//     microsoft_id: string;
//     auth_provider: string;
//     job_title: string;
//     department: string;
//     office_location: string;
//     mobile_phone: string;
//     business_phones: string;
//     permissions: JSON; 
//     role_id: number;
//     program_id: number;
//     status_id: number;
//     status: number;