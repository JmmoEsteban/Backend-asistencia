import type { Group } from "../domain/Group";
import type { GroupPort } from "../domain/GroupPort";

export class GroupApplication {
    private port: GroupPort;

    constructor(port: GroupPort){
        this.port = port;
    }

    async createGroup(group: Omit<Group, "id_group">): Promise<number>{
        return await this.port.createGroup(group);
    }

    async updateGroup(id: number, group: Partial<Group>): Promise<boolean>{
        const groupExists = await this.port.getByIdGroup(id);
        if(!groupExists){
            throw new Error('Grupo no encontrado');
        }
        return await this.port.updateGroup(id, group);
    }

    async deleteGroup(id: number): Promise<boolean>{
        const groupExists = await this.port.getByIdGroup(id);
        if(!groupExists){
            throw new Error('Grupo no encontrado');
        }
        return await this.port.deleteGroup(id);
    }

    async getByIdGroup(id: number): Promise<Group | null>{
        return await this.port.getByIdGroup(id);
    }

    async getAllGroups(): Promise<Group[]>{
        return await this.port.getAllGroups();
    }
}