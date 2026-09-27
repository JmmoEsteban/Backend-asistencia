import type { Request, Response } from "express";
import type { GroupApplication } from "../../application/GroupApplication";
import type { Group } from "../../domain/Group";
import { loadGroupData } from "../../../../shared/util/group-validator";
import { loadUpdateGroupData } from "../../../../shared/util/group-update-validation";

export class GroupController {
    private app: GroupApplication;

    constructor(application: GroupApplication){
        this.app = application;
    }

    async createGroup(req: Request, res: Response): Promise<Response> {
        try {
            const { access_code_group, id_subjects, id_promotions, id_programs, status_group } = loadGroupData(req.body);
            const group: Omit<Group, "id_group" | "subjects" | "programs" | "promotion"> = {
                access_code_group,
                id_subjects,
                id_promotions,
                id_programs,
                status_group
            };
            const groupId = await this.app.createGroup(group);
            return res.status(201).json({ message: "Grupo creado con exito", groupId });
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async updateGroup(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)){
                return res.status(400).json({ error: "ID invalido" });
            }
            const dataLoad = loadUpdateGroupData(req.body);
            const updated = await this.app.updateGroup(id, dataLoad);
            if (!updated){
                return res.status(404).json({ error: "Grupo no encontrado o sin cambios" });
            }
            return res.status(200).json({ message: "Grupo actualizado con exito" });
        } catch (error) {
            if (error instanceof Error){
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getAllGroups(req: Request, res: Response): Promise<Response> {
        try {
            const groups = await this.app.getAllGroups();
            return res.status(200).json(groups);
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    async getByIdGroup(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido" });

            const group = await this.app.getByIdGroup(id);
            if (!group) {
                return res.status(404).json({ message: "Grupo no encontrado" });
            }
            return res.status(200).json(group);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getByIdProgram(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido" });

            const group = await this.app.getByProgram(id);
            if (!group) {
                return res.status(404).json({ message: "Grupos no encontrados" });
            }
            return res.status(200).json(group);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }


    }

    async getByIdPromotion(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido" });

            const group = await this.app.getByPromotion(id);
            if (!group) {
                return res.status(404).json({ message: "Grupos no encontrados" });
            }
            return res.status(200).json(group);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }


    }

    async getByIdSubject(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido" });

            const group = await this.app.getBySubject(id);
            if (!group) {
                return res.status(404).json({ message: "Grupos no encontrados" });
            }
            return res.status(200).json(group);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }


    }

    async deleteGroup(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido" });

            const deleted = await this.app.deleteGroup(id);
            if (!deleted) {
                return res.status(404).json({ message: "Grupo no encontrado" });
            }
            return res.status(200).json({ message: "Grupo eliminado con exito" });
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}
