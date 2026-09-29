//import { number } from "joi";
import { loadUpdateProgramsData } from "../../../../shared/util/programs-update-validation";
import { loadProgramsData } from "../../../../shared/util/programs-validator";
import type { ProgramsApplication } from "../../application/ProgramsApplication";
import type { Programs } from "../../domain/Programs";
import { json, type Request, type Response } from "express";

export class ProgramsController{
    private app: ProgramsApplication;

    constructor(application: ProgramsApplication){
        this.app = application;
    }

    async createPrograms(req: Request, res: Response){
        try {
            const { name } = loadProgramsData(req.body);
            const programs: Omit<Programs, "id"> = {name};
            const programsId = await this.app.createPrograms(programs);
            return res
                .status(201)
                .json({message: "Programa creada con exito", programsId});
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

    async updatePrograms(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)){
                return res.status(400).json({error: "ID invalido"});
            }
            const dataLoad = loadUpdateProgramsData(req.body);
            const updated = await this.app.updatePrograms(id, dataLoad);
            if (!updated){
                return res
                    .status(404)
                    .json({ error: "Programa no encontrado o sin cambios"});
            }
            return res
                .status(200)
                .json({ message: "Programa actualizado con exito"});
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

    async getAllPrograms(req: Request, res: Response): Promise<Response>{
        try {
            const programs = await this.app.getAllPrograms();
            return res.status(200).json(programs);
        } catch (error) {
            return res
                    .status(500)
                    .json({
                        message: "Error interno del servidor", error
                    });
        }
    }

    async getProgramsById(req: Request, res: Response): Promise<Response>{
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

            const programs = await this.app.getProgramsById(id);
            if (!programs)
                return res.status(400).json({ message: "Programa no encontrado" });
            return res.status(200).json(programs);
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

 

    async getProgramsByName(req: Request, res: Response): Promise<Response> { 
        try { // Validación del email usando Joi 
            const {name} = loadProgramsData(req.params);  
            const programs = await this.app.getProgramsByName(name);  
            if (!programs) { 
                return res.status(404).json  ({message: "Programa no encontrado"});
            }  
            return res.status(200).json(programs); } 
        catch (error) { 
            if (error instanceof Error) { 
                return res.status(400).json({ error: error.message });  
            }
            return res.status(500).json({ error: "Error interno del servidor", 
                details: error instanceof Error ? error.message : "Error desconocido",});
        }
    }

    // async deletePrograms(req: Request, res: Response): Promise<Response>{
    //     try {
    //         const id = Number(req.params.id);
    //         if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido"});

    //         const deleted = await this.app.deletePrograms(id);
    //         if (!deleted)
    //             return res.status(400).json({ message:"Programa no encontrado" });
    //         return res.status(200).json({message: "Programa eliminado con exito"});
    //     } catch (error) {
    //         if (error instanceof Error){
    //             return res
    //                 .status(500)
    //                 .json({
    //                     error: "Error interno del servidor",
    //                     details: error.message,
    //                 });
    //         }
    //         return res.status(500).json({ error: "Error interno del servidor" });
    //     }
    // }

}