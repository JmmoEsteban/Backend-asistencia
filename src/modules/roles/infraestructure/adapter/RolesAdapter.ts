import type { Repository } from "typeorm";
import type { User as UserDomain} from "../../domain/Roles";
import type { UserPort } from "../../domain/RolesPort";
import {User as UserEntity} from "../entities/Roles"
import { AppDataSource } from "../../../../shared/config/data-base";

export class UserAdapter implements UserPort{

    private userRepository: Repository<UserEntity>

    constructor(){
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    private toDomain(user: UserEntity): UserDomain{
        return{
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            microsoft_id: user.microsoft_id,
            auth_provider: user.auth_provider,
            job_title: user.job_title,
            department: user.department,
            office_location: user.office_location,
            mobile_phone: user.mobile_phone,
            business_phones: user.business_phones,
            permissions: user.permissions,
            role_id: user.role_id,
            program_id: user.program_id,
            status_id: user.status_id,
            created_at: user.created_at   
        }
    }

    private toEntity(user: Omit<UserDomain, "id">):UserEntity{
        const userEntity = new UserEntity();
        userEntity.first_name = user.first_name;
        userEntity.last_name = user.last_name;
        userEntity.email = user.email;
        userEntity.password = user.password,
        userEntity.microsoft_id = user.microsoft_id,
        userEntity.auth_provider = user.auth_provider,
        userEntity.job_title = user.job_title,
        userEntity.department = user.department,
        userEntity.office_location = user.office_location,
        userEntity.mobile_phone = user.mobile_phone,
        userEntity.business_phones = user.business_phones,
        userEntity.permissions = user.permissions,
        userEntity.role_id = user.role_id,
        userEntity.program_id = user.program_id,
        userEntity.status_id = user.status_id,
        userEntity.created_at = user.created_at  
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
                first_name_user: user.first_name ?? existingUser.first_name,
                last_name_user: user.last_name ?? existingUser.last_name,
                email_user: user.email ?? existingUser.email,
                password_user: user.password ?? existingUser.password,
                microsoft_id_user: user.microsoft_id ?? existingUser.microsoft_id,
                auth_provider_user: user.auth_provider ?? existingUser.auth_provider,
                job_title_user: user.job_title ?? existingUser.job_title,
                department_user: user.department ?? existingUser.department,
                office_location_user: user.office_location ?? existingUser.office_location,
                mobile_phone_user: user.mobile_phone ?? existingUser.mobile_phone,
                business_phones_user: user.business_phones ?? existingUser.business_phones,
                permissions_user: user.permissions ?? existingUser.permissions,
                role_id_user: user.role_id ?? existingUser.role_id,
                program_id_user: user.program_id ?? existingUser.program_id,
                status_id_user: user.status_id ?? existingUser.status_id,
                created_at_user: user.created_at ?? existingUser.created_at 
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
            const user = await this.userRepository.findOne({where: {id : id}});
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.log("Error obteniendo usuario por id", error)
            throw new Error("Error obteniendo usuario ")
        }
    }

    async getUserByEmail(email: string): Promise<UserDomain | null> {
        const user = await this.userRepository.findOne({where: {email : email}});
        if (!user) return null;
        
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            microsoft_id: user.microsoft_id,
            auth_provider: user.auth_provider,
            job_title: user.job_title,
            department: user.department,
            office_location: user.office_location,
            mobile_phone: user.mobile_phone,
            business_phones: user.business_phones,
            permissions: user.permissions,
            role_id: user.role_id,
            program_id: user.program_id,
            status_id: user.status_id,
            created_at: user.created_at
        }
    }

    async getUserByRol(rol: number): Promise<UserDomain[] | null> {
        try {
            const users = await this.userRepository.find({ where: { role_id: rol } });
            return users.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuarios por rol", error);
            throw new Error("Error obteniendo usuarios por rol");
        }
    }

    async getAllUsers(): Promise<UserDomain[]> {
        try {
            const users = await this.userRepository.find({where : {status_id:1}});
            return users.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuarios", error)
            throw new Error("Error obteniendo lista de usuarios")
        }
    }

}