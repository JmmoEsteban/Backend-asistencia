//import { number } from "joi";
import { loadAttendanceData } from "../../../../shared/util/attendance-validator";
import type { SessionApplication } from "../../application/SessionApplication";
import type { Session } from "../../domain/Session";
import { json, type Request, type Response } from "express";
import { loadUpdateUserData } from "../../../../shared/util/user-update-validation";
import { loadUpdateAttendanceData } from "../../../../shared/util/attendance-update-validation";
import { loadSessionData } from "../../../../shared/util/session-validator";
import { loadUpdateSessionData } from "../../../../shared/util/session-update-validation";

export class SessionController{
    private app: SessionApplication;

    constructor(application: SessionApplication){
        this.app = application;
    }

    async createSession(req: Request, res: Response){
        try {
            const {date, day, group_id, status} = loadSessionData(req.body);
            const session: Omit<Session, "id"> = {date, day, group_id, status};
            const sessionId = await this.app.createSession(session);
            return res
                .status(201)
                .json({message: "Sesion creada con exito", sessionId});
        } catch (error) {
            if (error instanceof Error){
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async updateSession(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)){
                return res.status(400).json({error: "ID invalido"});
            }
            const dataLoad = loadUpdateSessionData(req.body);
            const updated = await this.app.updateSession(id, dataLoad);
            if (!updated){
                return res
                    .status(404)
                    .json({ error: "Sesion no encontrada o sin cambios"});
            }
            return res
                .status(200)
                .json({ message: "Sesion actualizada con exito"});
        } catch (error) {
            if (error instanceof Error){
                return res
                    .status(400)
                    .json({
                        error: error.message
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getAllSession(req: Request, res: Response): Promise<Response>{
        try {
            const session = await this.app.getAllSession();
            return res.status(200).json(session);
        } catch (error) {
            return res
                    .status(500)
                    .json({
                        message: "Error interno del servidor", error
                    });
        }
    }

    async getSessionById(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const session = await this.app.getSessionById(id);
            if (!session)
                return res.status(400).json({ message: "Sesion no encontrada" });
            return res.status(200).json(session);
        } catch (error) {
            if (error instanceof Error){
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getSessionByGroup(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.sessionid);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const session = await this.app.getSessionByGroup(id);
            if (!session)
                return res.status(400).json({ message: "Grupo no encontrado" });
            return res.status(200).json(session);
        } catch (error) {
            if (error instanceof Error){
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async deleteSession(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const deleted = await this.app.deleteSession(id);
            if (!deleted)
                return res.status(400).json({ message:"Sesion no encontrada" });
            return res.status(200).json({message: "Sesion eliminada con exito"});
        } catch (error) {
            if (error instanceof Error){
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}