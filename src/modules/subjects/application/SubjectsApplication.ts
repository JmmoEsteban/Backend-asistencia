
// import { string } from "joi";
import type { Subjects } from "../domain/Subjects";
import type { SubjectsPort } from "../domain/SubjectsPort";

export class SubjectsApplication{
    private port: SubjectsPort;

    constructor(port: SubjectsPort){
        this.port = port;
    }

    async createSubjects(Subjects: Omit<Subjects, "id">): Promise<number>{
        const existSubjects = await this.port.getSubjectsByName(Subjects.name);
        if (existSubjects){
            throw new Error("La materia ya existe");
        }
        return this.port.createSubjects(Subjects);
    };

    async getSubjectsById(id: number): Promise<Subjects | null>{
        return await this.port.getSubjectsById(id);
    }

    async getSubjectsByName(name: string): Promise<Subjects[] | null>{
        return await this.port.getSubjectsByName(name);
    }


    async getAllSubjects(): Promise<Subjects[]>{
        return await this.port.getAllSubjects();
    }

    async updateSubjects(id: number, subjects: Partial<Subjects>): Promise<boolean>{
        const existSubjects = this.port.getSubjectsById(id);
        if (!existSubjects){
            throw new Error("materia no encontrada"); 
        }
        return await this.port.updateSubjects(id, subjects);
    }

    async deleteSubjects(id: number): Promise<boolean>{
        return await this.port.deleteSubjects(id);
    }

}