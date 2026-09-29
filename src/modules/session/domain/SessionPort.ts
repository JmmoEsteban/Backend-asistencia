import type { Session } from "./Session";

export interface SessionPort{
    createSession(session: Omit<Session, "id" | "group">): Promise<number>;
    updateSession(id: number, session: Partial<Omit<Session, "group">>): Promise<boolean>;
    deleteSession(id: number): Promise<boolean>;
    getSessionById(id: number): Promise<Session | null>;
    getSessionByDate(date: string): Promise<Session[] | null>;
    getSessionByGroup(Groupid: number): Promise<Session[] | null>;
    getAllSession(): Promise<Session[]>;
}