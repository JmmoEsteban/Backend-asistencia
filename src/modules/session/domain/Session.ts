import type { Group } from "../../groups/infraestructure/entities/Group";

export interface Session {
    id: number;
    date: string;
    day: number,
    id_group: number;
    status: number;
    group: Group;
}