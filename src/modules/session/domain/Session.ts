import type { Group } from "../../groups/infraestructure/entities/Group";

export interface Session {
    id: number;
    date: Date;
    day: number,
    id_group: number;
    status: number;
    group: Group;
}