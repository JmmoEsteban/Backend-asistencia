import type { Session } from "./Session";

export interface SessionPort{
    createSession(session: Omit<Session, "id">): Promise<number>;
    updateSession(id: number, session: Partial<Session>): Promise<boolean>;
    deleteSession(id: number): Promise<boolean>;
    getSessionById(id: number): Promise<Session | null>;
    getSessionByDate(date: Date): Promise<Session[] | null>;
    getSessionByGroup(Groupid: number): Promise<Session[] | null>;
    getAllSession(): Promise<Session[]>;
}