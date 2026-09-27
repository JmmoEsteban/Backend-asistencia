import type { RegistrationApplication } from "../../application/RegistrationApplication";
import type { Request, Response } from "express";
import { loadUserData } from "../../../../shared/util/user-validation";
import type { Registration } from "../../domain/Registration";
import { loadUpdateUserData } from "../../../../shared/util/user-update-validation";
import { loadEmail } from "../../../../shared/util/email.validation";

export class RegistrationController {

    private app: RegistrationApplication;

    constructor(application: RegistrationApplication){
        this.app = application;
    }

    async getRegistrationById(req: Request, res: Response):Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400)
                .json({error: "ID inválido"});

            const registration = await this.app.getRegistrationById(id);
            if (!registration){
                return res.status(404)
                .json({error: "Inscripción no encontrado"})
            }
            return res.status(200).json(registration);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500)
                .json({ error: "Error interno del servidor", details: error.message});
            }
            return res.status(500)
            .json({error: "Error interno del servidor"})
        }
    }

    async getRegistrationByUser(req: Request, res: Response): Promise<Response> { 
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400)
                .json({error: "ID inválido"});

            const registration = await this.app.getRegistrationById(id);
            if (!registration){
                return res.status(404)
                .json({error: "Inscripción no encontrado"})
            }
            return res.status(200).json(registration);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500)
                .json({ error: "Error interno del servidor", details: error.message});
            }
            return res.status(500)
            .json({error: "Error interno del servidor"})
        }
    }

    async getRegistrationsByGroups(req: Request, res: Response): Promise<Response> { 
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400)
                .json({error: "ID inválido"});

            const registration = await this.app.getRegistrationById(id);
            if (!registration){
                return res.status(404)
                .json({error: "Inscripción no encontrado"})
            }
            return res.status(200).json(registration);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500)
                .json({ error: "Error interno del servidor", details: error.message});
            }
            return res.status(500)
            .json({error: "Error interno del servidor"})
        }
    }

    async getAllRegistrations(req: Request, res: Response): Promise<Response> { 
        try { const registrations = await this.app.getAllRegistrations(); 
            return res.status(200).json(registrations); 
        }catch (error) { 
            return res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    }
}