import type { Repository } from "typeorm";
import type { Roles as RoleDomain} from "../../domain/Roles";
import type { RolePort } from "../../domain/RolesPort";
import {Role as RoleEntity} from "../entities/Roles"
import { AppDataSource } from "../../../../shared/config/data-base";

export class RoleAdapter implements RolePort{

    private roleRepository: Repository<RoleEntity>

    constructor(){
        this.roleRepository = AppDataSource.getRepository(RoleEntity);
    }
    private toDomain(role: RoleEntity): RoleDomain{
        return{
            id_role: role.id,
            name_role: role.name
        }
    }
    
    private toEntity(role: Omit<RoleDomain, "id">):RoleEntity{
        const roleEntity = new RoleEntity();
        roleEntity.name = role.name_role;
        return roleEntity;
    }

    async getRoleById(id: number): Promise<RoleDomain | null> {
        try {
            const role = await this.roleRepository.findOne({where: {id : id}});
            return role ? this.toDomain(role) : null;
        } catch (error) {
            console.log("Error obteniendo rol por id", error)
            throw new Error("Error obteniendo rol ")
        }
    }

    async getRoleByName(name: string): Promise<RoleDomain | null> {
        try {
            const role = await this.roleRepository.findOne({ where: { name: name } });
            return role ? this.toDomain(role) : null;
        } catch (error) {
            console.log("Error obteniendo usuarios por rol", error);
            throw new Error("Error obteniendo usuarios por rol");
        }
    }

    async getAllRoles(): Promise<RoleDomain[]> {
        try {
            const roles = await this.roleRepository.find();
            return roles.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuarios", error)
            throw new Error("Error obteniendo lista de usuarios")
        }
    }

}