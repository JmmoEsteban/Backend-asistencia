import type { Group } from "../../groups/infraestructure/entities/Group";
import type { User } from "../../users/infraestructure/entities/User";

export interface Registration{
    id: number;
    id_users:number;
    id_groups:number;
    status: number;
    Group: Group;
    User: User;
}