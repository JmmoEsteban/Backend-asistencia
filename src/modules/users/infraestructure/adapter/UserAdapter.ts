import type { Repository } from "typeorm";
import type { User as UserDomain} from "../../domain/User";
import type { UserPort } from "../../domain/UserPort";
import {User as UserEntity} from "../entities/User"
import { AppDataSource } from "../../../../shared/config/data-base";

export class UserAdapter implements UserPort{

    private userRepository: Repository<UserEntity>

    constructor(){
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    private toDomain(user: UserEntity): UserDomain{
        return{
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            contraseña: user.contraseña,
            telefono: user.telefono,
            rol: user.rol,
            status: user.status   
        }
    }

    private toEntity(user: Omit<UserDomain, "id">):UserEntity{
        const userEntity = new UserEntity();
        userEntity.nombre = user.nombre;
        userEntity.email = user.email;
        userEntity.contraseña = user.contraseña;
        userEntity.telefono = user.telefono;
        userEntity.rol = user.rol;
        userEntity.status = user.status;
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
                nombre_usuario: user.nombre ?? existingUser.nombre,
                email_usuario: user.email ?? existingUser.email,
                contraseña_usuario: user.contraseña ?? existingUser.contraseña,
                telefono_usuario: user.telefono ?? existingUser.telefono,
                rol_usuario: user.rol ?? existingUser.rol,
                status_usuario: user.rol ?? existingUser.status
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
            nombre: user.nombre,
            contraseña: user.contraseña,
            email: user.email,
            telefono: user.telefono,
            rol: user.rol,
            status: user.status
        }
    }

    async getUserByRol(rol: string): Promise<UserDomain[] | null> {
        try {
            const users = await this.userRepository.find({ where: { rol } });
            return users.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuarios por rol", error);
            throw new Error("Error obteniendo usuarios por rol");
        }
    }

    async getAllUsers(): Promise<UserDomain[]> {
        try {
            const users = await this.userRepository.find({where : {status:1}});
            return users.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuarios", error)
            throw new Error("Error obteniendo lista de usuarios")
        }
    }

}