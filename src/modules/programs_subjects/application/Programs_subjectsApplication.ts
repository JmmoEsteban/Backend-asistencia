import bcrypt from "bcryptjs";
import type { Programs_subjects } from "../domain/Programs_subjects";
import type { Programs_subjectsPort } from "../domain/Programs_subjectsPort";
import { User } from "../../users/infraestructure/entities/User";

export class Programs_subjectsApplication{
    private port: Programs_subjectsPort;

    constructor(port: Programs_subjectsPort){
        this.port = port;
    }

    async getPrograms_subjectsById(id:number):Promise<Programs_subjects | null>{
        return await this.port.getPrograms_subjectsById(id);
    }

    async getPrograms_subjectsByPrograms(id:number):Promise<Programs_subjects[] | null>{
        return await this.port.getPrograms_subjectsByPrograms(id);
    }

    async getPrograms_subjectsBySubjects(id: number): Promise<Programs_subjects[] | null> {
        return await this.port.getPrograms_subjectsBySubjects(id);
    }

    async getAllPrograms_subjects():Promise<Programs_subjects[]>{
        return await this.port.getAllPrograms_subjects();
    }

    // async updateRegistration(id:number, user: Partial<User>): Promise<boolean>{
    //     const existingUser = await this.port.getUserById(id);
    //     if(!existingUser){
    //         throw new Error("Usuario no encontrado")
    //     }
    //     if (user.email){
    //         const emailTaken = await this.port.getUserByEmail(user.email);
    //         if (emailTaken && emailTaken.id !== id){
    //             throw new Error("El email ya está en uso");
    //         }
    //     }
    //     return this.port.updateUser(id, user);
    // }

    // async deleteRegistration(id:number): Promise<boolean>{
    //     return await this.port.deleteUser(id);
    // }
}