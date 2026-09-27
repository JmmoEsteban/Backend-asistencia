import type { Roles } from "./Roles";

export interface RolePort{
 
    getRoleById(id_role:number):Promise<Roles | null>;
    getRoleByName(name_role:string): Promise<Roles | null>;
    getAllRoles(): Promise<Roles[]>;
}