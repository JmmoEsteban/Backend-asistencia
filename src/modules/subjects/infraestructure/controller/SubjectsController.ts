//import { number } from "joi";
import { loadSubjectsData } from "../../../../shared/util/subjects-validator";
import type { SubjectsApplication } from "../../application/SubjectsApplication";
import type { Subjects } from "../../domain/Subjects";
import { json, type Request, type Response } from "express";
import { loadUpdateUserData } from "../../../../shared/util/user-update-validation";
import { loadUpdateSubjectsData } from "../../../../shared/util/subjects-update-validation";
import { string } from "joi";

export class SubjectsController{
    private app: SubjectsApplication;

    constructor(application: SubjectsApplication){
        this.app = application;
    }

    async createSubjects(req: Request, res: Response){
        try {
            const {name, status} = loadSubjectsData(req.body);
            const subjects: Omit<Subjects, "id"> = {name, status};
            const subjectsId = await this.app.createSubjects(subjects);
            return res
                .status(201)
                .json({message: "Materia creada con exito", subjectsId});
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

    async updateSubjects(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)){
                return res.status(400).json({error: "ID invalido"});
            }
            const dataLoad = loadUpdateSubjectsData(req.body);
            const updated = await this.app.updateSubjects(id, dataLoad);
            if (!updated){
                return res
                    .status(404)
                    .json({ error: "Materia no encontrado o sin cambios"});
            }
            return res
                .status(200)
                .json({ message: "Materia actualizado con exito"});
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

    async getAllSubjects(req: Request, res: Response): Promise<Response>{
        try {
            const subjects = await this.app.getAllSubjects();
            return res.status(200).json(subjects);
        } catch (error) {
            return res
                    .status(500)
                    .json({
                        message: "Error interno del servidor", error
                    });
        }
    }

    async getSubjectsById(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const subjects = await this.app.getSubjectsById(id);
            if (!subjects)
                return res.status(400).json({ message: "Materia no encontrado" });
            return res.status(200).json(subjects);
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

 

    async getSubjectsByName(req: Request, res: Response): Promise<Response> { 
        try { // Validación del email usando Joi 
            const {name} = loadSubjectsData(req.params);  
            const subjects = await this.app.getSubjectsByName(name);  
            if (!subjects) { 
                return res.status(404).json  ({message: "Materia no encontrado"});
            }  
            return res.status(200).json(subjects); } 
        catch (error) { 
            if (error instanceof Error) { 
                return res.status(400).json({ error: error.message });  
            }
            return res.status(500).json({ error: "Error interno del servidor", 
                details: error instanceof Error ? error.message : "Error desconocido",});
        }
    }

    async deleteSubjects(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const deleted = await this.app.deleteSubjects(id);
            if (!deleted)
                return res.status(400).json({ message:"Materia no encontrado" });
            return res.status(200).json({message: "Materia eliminado con exito"});
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