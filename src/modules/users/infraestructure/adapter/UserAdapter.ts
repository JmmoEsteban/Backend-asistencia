import type { Repository } from "typeorm";
import type { User as UserDomain} from "../../domain/User";
import type { UserPort } from "../../domain/UserPort";
import {User as UserEntity} from "../entities/User"
import { AppDataSource } from "../../../../shared/config/data-base";
import { Programs } from "../../../programs/infraestructure/entities/Programs";

export class UserAdapter implements UserPort{

    private userRepository: Repository<UserEntity>

    constructor(){
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    private toDomain(user: UserEntity): UserDomain{
        return{
            user_id: user.id,
            user_first_name: user.first_name,
            user_last_name: user.last_name,
            user_email: user.email,
            user_password: user.password,
            user_microsoft_id: user.microsoft_id,
            user_auth_provider: user.auth_provider,
            user_job_title: user.job_title,
            user_department: user.department,
            user_office_location: user.office_location,
            user_mobile_phone: user.mobile_phone,
            user_business_phones: user.business_phones,
            user_permissions: user.permissions,
            user_role_id: user.role_id,
            user_program_id: user.Program.id,
            user_status_id: user.status_id,
            user_created_at: user.created_at,
            Programs: user.Program

        }
    }

    private toEntity(user: Omit<UserDomain, "id">):UserEntity{
        const userEntity = new UserEntity();
        userEntity.first_name = user.user_first_name;
        userEntity.last_name = user.user_last_name;
        userEntity.email = user.user_email;
        userEntity.password = user.user_password,
        userEntity.microsoft_id = user.user_microsoft_id,
        userEntity.auth_provider = user.user_auth_provider,
        userEntity.job_title = user.user_job_title,
        userEntity.department = user.user_department,
        userEntity.office_location = user.user_office_location,
        userEntity.mobile_phone = user.user_mobile_phone,
        userEntity.business_phones = user.user_business_phones,
        userEntity.permissions = user.user_permissions,
        userEntity.role_id = user.user_role_id,
        userEntity.Program.id = user.user_program_id,
        userEntity.status_id = user.user_status_id,
        userEntity.created_at = user.user_created_at,  
        userEntity.Program = user.Programs
        return userEntity;
    }

    async createUser(user: Omit<UserDomain, "id">): Promise<number> {
        try {
            const newUser = this.toEntity(user);
            const savedUser = await this.userRepository.save(newUser);
            return savedUser.id;
        } catch (error) {
            throw new Error("Error al crear usuario")
        }
    }

    async updateUser(id: number, user: Partial<UserDomain>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where: {id: id}});
            if (!existingUser) return false;

            Object.assign(existingUser, {
                first_name_user: user.user_first_name ?? existingUser.first_name,
                last_name_user: user.user_last_name ?? existingUser.last_name,
                email_user: user.user_email ?? existingUser.email,
                password_user: user.user_password ?? existingUser.password,
                microsoft_id_user: user.user_microsoft_id ?? existingUser.microsoft_id,
                auth_provider_user: user.user_auth_provider ?? existingUser.auth_provider,
                job_title_user: user.user_job_title ?? existingUser.job_title,
                department_user: user.user_department ?? existingUser.department,
                office_location_user: user.user_office_location ?? existingUser.office_location,
                mobile_phone_user: user.user_mobile_phone ?? existingUser.mobile_phone,
                business_phones_user: user.user_business_phones ?? existingUser.business_phones,
                permissions_user: user.user_permissions ?? existingUser.permissions,
                role_id_user: user.user_role_id ?? existingUser.role_id,
                program_id_user: user.user_program_id ?? existingUser.Program,
                status_id_user: user.user_status_id ?? existingUser.status_id,
                created_at_user: user.user_created_at ?? existingUser,
                Programs: user.Programs ?? existingUser 
            });
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.log("Error actualizando usuario", error)
            throw new Error("Error actualizando usuario ")
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where: {id: id}});
            if (!existingUser) return false;
            //actualizar solo el status para baja
            Object.assign(existingUser, {
                status: 0
            })
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.log("Error al dar de baja al usuario", error)
            throw new Error("Error al dar de baja al usuario ")
        }
    }

    async getUserById(id: number): Promise<UserDomain | null> {
        try {
            const user = await this.userRepository.findOne({where: {id : id}, relations: {Program:true}});
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.log("Error obteniendo usuario por id", error)
            throw new Error("Error obteniendo usuario ")
        }
    }

    async getUserByEmail(email: string): Promise<UserDomain | null> {
        const user = await this.userRepository.findOne({where: {email : email},  relations: {Program:true}});
        if (!user) return null;
        
        return {
            user_id: user.id,
            user_first_name: user.first_name,
            user_last_name: user.last_name,
            user_email: user.email,
            user_password: user.password,
            user_microsoft_id: user.microsoft_id,
            user_auth_provider: user.auth_provider,
            user_job_title: user.job_title,
            user_department: user.department,
            user_office_location: user.office_location,
            user_mobile_phone: user.mobile_phone,
            user_business_phones: user.business_phones,
            user_permissions: user.permissions,
            user_role_id: user.role_id,
            user_program_id: user.Program.id,
            user_status_id: user.status_id,
            user_created_at: user.created_at,
            Programs: user.Program
        }
    }

    async getUserByRol(rol: number): Promise<UserDomain[] | null> {
        try {
            const users = await this.userRepository.find({ where: { role_id: rol },  relations: {Program:true} });
            return users.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuarios por rol", error);
            throw new Error("Error obteniendo usuarios por rol");
        }
    }

    async getUserByProgram(programId: number): Promise<UserDomain[] | null> {
        try {
            const users = await this.userRepository.find({ where: {Program: {id: programId} },  relations: {Program:true} });
            return users.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuario por id", error)
            throw new Error("Error obteniendo usuario ")
        }
    }

    async getAllUsers(): Promise<UserDomain[]> {
        try {
            const users = await this.userRepository.find({where : {status_id:1},  relations: {Program:true}});
            return users.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuarios", error)
            throw new Error("Error obteniendo lista de usuarios")
        }
    }

}