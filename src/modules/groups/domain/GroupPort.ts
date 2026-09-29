import type { Group } from "./Group";

export interface GroupPort {
    createGroup(group: Omit<Group, "id_group" | "subjects" | "programs" | "promotion">): Promise<number>;
    updateGroup(id: number, group: Partial<Omit<Group, "subjects" | "programs" | "promotion">>): Promise<boolean>;
    deleteGroup(id: number): Promise<boolean>;
    getByIdGroup(id: number): Promise<Group | null>;
    getByIdProgram(id_program:number): Promise<Group[]>;
    getByIdPromotion(id_promotion:number): Promise<Group[]>;
    getByIdSubject(id_subject:number): Promise<Group[]>;
    getAllGroups(): Promise<Group[]>;  
}