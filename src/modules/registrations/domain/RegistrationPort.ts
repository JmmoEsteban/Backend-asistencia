import type { Registration } from "./Registration";

export interface RegistrationPort{
 
    createRegistration(user: Omit<Registration, "id">):Promise<number>;
    updateRegistration(id:number, user:Partial<Registration>):Promise<boolean>;
    deleteRegistration(id:number):Promise<boolean>;
    getRegistrationById(id:number):Promise<Registration | null>;
    getRegistrationsByUser(id:number):Promise<Registration[] | null>;
    getRegistrationsByGroups(id:number):Promise<Registration[] | null>;
    getAllRegistrations(): Promise<Registration[]>;
}