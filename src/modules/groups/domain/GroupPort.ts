import type { Group } from "./Group";

export interface GroupPort {
    createGroup(group: Omit<Group, "id_group">): Promise<number>;
    updateGroup(id: number, group: Partial<Group>): Promise<boolean>;
    deleteGroup(id: number): Promise<boolean>;
    getByIdGroup(id: number): Promise<Group | null>;
    getAllGroups(): Promise<Group[]>;  
}