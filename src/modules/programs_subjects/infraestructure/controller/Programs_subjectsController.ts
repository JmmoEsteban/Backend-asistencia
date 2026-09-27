// import type { RegistrationApplication } from "../../application/Programs_subjectsApplication";
import type { Request, Response } from "express";
import type { Programs_subjectsApplication } from "../../application/Programs_subjectsApplication";

export class Programs_subjectsController {

    private app: Programs_subjectsApplication;

    constructor(application: Programs_subjectsApplication){
        this.app = application;
    }

    async getPrograms_subjectsById(req: Request, res: Response):Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400)
                .json({error: "ID inválido"});

            const programs_subjects = await this.app.getPrograms_subjectsById(id);
            if (!programs_subjects){
                return res.status(404)
                .json({error: "no encontrado"})
            }
            return res.status(200).json(programs_subjects);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500)
                .json({ error: "Error interno del servidor", details: error.message});
            }
            return res.status(500)
            .json({error: "Error interno del servidor"})
        }
    }

    async getPrograms_subjectsByPrograms(req: Request, res: Response): Promise<Response> { 
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400)
                .json({error: "ID inválido"});

            const programs_subjects = await this.app.getPrograms_subjectsById(id);
            if (!programs_subjects){
                return res.status(404)
                .json({error: "no encontrado"})
            }
            return res.status(200).json(programs_subjects);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500)
                .json({ error: "Error interno del servidor", details: error.message});
            }
            return res.status(500)
            .json({error: "Error interno del servidor"})
        }
    }

    async getPrograms_subjectsBySubjects(req: Request, res: Response): Promise<Response> { 
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400)
                .json({error: "ID inválido"});

            const programs_subjects = await this.app.getPrograms_subjectsById(id);
            if (!programs_subjects){
                return res.status(404)
                .json({error: "no encontrado"})
            }
            return res.status(200).json(programs_subjects);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500)
                .json({ error: "Error interno del servidor", details: error.message});
            }
            return res.status(500)
            .json({error: "Error interno del servidor"})
        }
    }

    async getAllPrograms_subjects(req: Request, res: Response): Promise<Response> { 
        try { const programs_subjects = await this.app.getAllPrograms_subjects(); 
            return res.status(200).json(programs_subjects); 
        }catch (error) { 
            return res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    }
}