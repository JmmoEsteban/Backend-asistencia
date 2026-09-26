import type { Group } from "./Group";

export interface GroupPort {
    createGroup(group: Omit<Group, "group_id">): Promise<number>;
    updateGroup(id: number, group: Partial<Group>): Promise<boolean>;
    deleteGroup(id: number): Promise<boolean>;
    getByIdGroup(id: number): Promise<Group | null>;
    getAllGroups(): Promise<Group[]>;  
}