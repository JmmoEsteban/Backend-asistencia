//import { number } from "joi";
import { loadAttendanceData } from "../../../../shared/util/attendance-validator";
import type { AttendanceApplication } from "../../application/AttendanceApplication";
import type { Attendance } from "../../domain/Attendance";
import { json, type Request, type Response } from "express";
import { loadUpdateUserData } from "../../../../shared/util/user-update-validation";
import { loadUpdateAttendanceData } from "../../../../shared/util/attendance-update-validation";

export class AttendanceController{
    private app: AttendanceApplication;

    constructor(application: AttendanceApplication){
        this.app = application;
    }

    async createAttendance(req: Request, res: Response){
        try {
            const {date, user_id, session_id, status} = loadAttendanceData(req.body);
            const attendance: Omit<Attendance, "id"> = {date, user_id, session_id, status};
            const attendanceId = await this.app.createAttendance(attendance);
            return res
                .status(201)
                .json({message: "Asistencia creada con exito", attendanceId});
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

    async updateAttendance(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)){
                return res.status(400).json({error: "ID invalido"});
            }
            const dataLoad = loadUpdateAttendanceData(req.body);
            const updated = await this.app.updateAttendance(id, dataLoad);
            if (!updated){
                return res
                    .status(404)
                    .json({ error: "Asistencia no encontrada o sin cambios"});
            }
            return res
                .status(200)
                .json({ message: "Asistencia actualizada con exito"});
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

    async getAllAttendance(req: Request, res: Response): Promise<Response>{
        try {
            const attendance = await this.app.getAllAttendance();
            return res.status(200).json(attendance);
        } catch (error) {
            return res
                    .status(500)
                    .json({
                        message: "Error interno del servidor", error
                    });
        }
    }

    async getAttendanceById(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const attendance = await this.app.getAttendanceById(id);
            if (!attendance)
                return res.status(400).json({ message: "Asistencia no encontrada" });
            return res.status(200).json(attendance);
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

    async getAttendanceByUser(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.userid);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const attendance = await this.app.getAttendanceByUser(id);
            if (!attendance)
                return res.status(400).json({ message: "Usuario no encontrado" });
            return res.status(200).json(attendance);
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

    async getAttendanceBySession(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.sessionid);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const attendance = await this.app.getAttendanceBySession(id);
            if (!attendance)
                return res.status(400).json({ message: "Sesion no encontrado" });
            return res.status(200).json(attendance);
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

    async deleteAttendance(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const deleted = await this.app.deleteAttendance(id);
            if (!deleted)
                return res.status(400).json({ message:"Asistencia no encontrado" });
            return res.status(200).json({message: "Asistencia eliminada con exito"});
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