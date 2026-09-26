import type { Repository } from "typeorm";
import type { Session as SessionDomain } from "../../domain/Session";
import { Session as SessionEntity } from "../entities/Session";
import type { SessionPort } from "../../domain/SessionPort";
import { AppDataSource } from "../../../../shared/config/data-base";
import type { date } from "joi";
//import { object } from "joi";

export class SessionAdapter implements SessionPort{

    private sessionRepository: Repository<SessionEntity>

    constructor(){
        this.sessionRepository = AppDataSource.getRepository(SessionEntity);
    }

    private toDomain(session: SessionEntity): SessionDomain{
        return{
            id: session.id_session,
            date: session.date_session,
            day: session.day_session,
            group_id: session.id_group,
            status: session.status_session
        }
    }

    private toEntity(session: Omit<SessionDomain, "id">): SessionEntity{
        const sessionEntity = new SessionEntity();
        sessionEntity.date_session = session.date;
        sessionEntity.day_session = session.day;
        sessionEntity.id_group = session.group_id;
        sessionEntity.status_session = session.status;
        return sessionEntity;
    }

    async createSession(session: Omit<SessionDomain, "id">): Promise<number> {
        try {
            const newSession = this.toEntity(session);
            const savedSession = await this.sessionRepository.save(newSession);
            return savedSession.id_session;
        } catch (error) {
            console.error("Error creando la sesion", error);
            throw new Error("Error al crear la sesion");
        }
    }
    async updateSession(id: number, session: Partial<SessionDomain>): Promise<boolean> {
        try {
            const existSession = await this.sessionRepository.findOne({ where: { id_session: id }});
            if (!existSession) return false;

            Object.assign(existSession, {
                date_session: session.date ?? existSession.date_session,
                day_session: session.day ?? existSession.day_session,
                id_group: session.group_id ?? existSession.id_group,
                status_session: session.status ?? existSession.status_session
            });

            await this.sessionRepository.save(existSession);
            return true;

        } catch (error) {
            console.error("Error actualizando la sesion");
            throw new Error("Error al actualizar la sesion");
        }
    }
    async deleteSession(id: number): Promise<boolean> {
        try {
            const existSession = await this.sessionRepository.findOne({where: {id_session: id}});
            if (!existSession) return false;
            Object.assign(existSession, {
                status_session: 0
            })
            await this.sessionRepository.save(existSession);
            return true;
        } catch (error) {
            console.error("Error al dar de baja la sesion");
            throw new Error("Error al dar de baja la sesion");
        }
    }
    async getSessionById(id: number): Promise<SessionDomain | null> {
        try {
            const session = await this.sessionRepository.findOne({where: {id_session: id}});
            return session ? this.toDomain(session) : null;
        } catch (error) {
            console.error("Error obteniendo la sesion por ID");
            throw new Error("Error al obtener la session por ID");
        }
    }
    async getSessionByDate(date: Date): Promise<SessionDomain[] | null> {
        try {
            const session = await this.sessionRepository.find({where: {date_session: date}});
            return session ? session.map(this.toDomain) : null;
        } catch (error) {
            console.error("Error obteniendo la sesion por fecha");
            throw new Error("Error al obtener la sesion por fecha");
        }
    }
    async getSessionByGroup(Groupid: number): Promise<SessionDomain[] | null> {
        try {
            const session = await this.sessionRepository.find({where: {id_group: Groupid}});
            return session ? session.map(this.toDomain) : null;
        } catch (error) {
            console.error("Error obteniendo la sesion por grupo");
            throw new Error("Error al obtener la sesion por grupo");
        }
    }
    async getAllSession(): Promise<SessionDomain[]> {
        try {
            const session = await this.sessionRepository.find({where: {status_session: 1}});
            return session.map(this.toDomain);
        } catch (error) {
            console.error("Error obteniendo todas las sesiones", error);
            throw new Error("Error al obtener todas las sesiones");
        }
    }

}