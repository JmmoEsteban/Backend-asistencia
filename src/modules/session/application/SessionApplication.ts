//import { number } from "joi";
import type { Session } from "../domain/Session";
import type { SessionPort } from "../domain/SessionPort";

export class SessionApplication{
    private port: SessionPort;

    constructor(port: SessionPort){
        this.port = port;
    }

    async createSession(session: Omit<Session, "id">): Promise<number>{
        return this.port.createSession(session);
    };

    async getSessionById(id: number): Promise<Session | null>{
        return await this.port.getSessionById(id);
    }

    async getSessionByDate(date: Date): Promise<Session[] | null>{
        return await this.port.getSessionByDate(date);
    }

    async getSessionByGroup(Groupid: number): Promise<Session[] | null>{
        return await this. port.getSessionByGroup(Groupid);
    }

    async getAllSession(): Promise<Session[]>{
        return await this.port.getAllSession();
    }

    async updateSession(id: number, session: Partial<Session>): Promise<boolean>{
        const existSession = this.port.getSessionById(id);
        if (!existSession){
            throw new Error("Sesion no encontrada"); 
        }
        return await this.port.updateSession(id, session);
    }

    async deleteSession(id: number): Promise<boolean>{
        return await this.port.deleteSession(id);
    }

}