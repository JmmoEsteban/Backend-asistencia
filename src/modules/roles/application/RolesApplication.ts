import bcrypt from "bcryptjs";
import type { Roles } from "../domain/Roles";
import type { RolePort } from "../domain/RolesPort";
import type { Role } from "../infraestructure/entities/Roles";

export class RolesApplication{
    private port: RolePort;

    constructor(port: RolePort){
        this.port = port;
    }

    async getRoleById(id:number):Promise<Roles | null>{
        return await this.port.getRoleById(id);
    }

    async getRoleByName(name:string):Promise<Roles | null>{
        return await this.port.getRoleByName(name);
    }

    async getAllRoles():Promise<Roles[]>{
        return await this.port.getAllRoles();
    }
}