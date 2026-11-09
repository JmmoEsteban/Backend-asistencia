import type { Programs } from "../domain/Programs";
import type { ProgramsPort } from "../domain/ProgramsPort";

export class ProgramsApplication{
    private port: ProgramsPort;

    constructor(port: ProgramsPort){
        this.port = port;
    }

    async createPrograms(Programs: Omit<Programs, "id">): Promise<number>{
        const existPrograms = await this.port.getProgramsByName(Programs.name);
        if (!existPrograms){
            throw new Error("Ya existe un programa con ese nombre");
        }
        return this.port.createPrograms(Programs);
    };

    async getProgramsById(id: number): Promise<Programs | null>{
        return await this.port.getProgramsById(id);
    }

    async getProgramsByName(name: string): Promise<Programs[] | null>{
        return await this.port.getProgramsByName(name);
    }


    async getAllPrograms(): Promise<Programs[]>{
        return await this.port.getAllPrograms();
    }

    async updatePrograms(id: number, programs: Partial<Programs>): Promise<boolean>{
        const existPrograms = this.port.getProgramsById(id);
        if (!existPrograms){
            throw new Error("Programa no encontrada"); 
        }
        return await this.port.updatePrograms(id, programs);
    }

    // async deletePrograms(id: number): Promise<boolean>{
    //     return await this.port.deletePrograms(id);
    // }

}