import type { RolesApplication } from "../../application/RolesApplication";
import type { Request, Response } from "express";
import { loadRoleData } from "../../../../shared/util/role-validation";

export class RoleController {

    private app: RolesApplication;

    constructor(application: RolesApplication){
        this.app = application;
    }

    async getRoleById(req: Request, res: Response):Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400)
                .json({error: "ID inválido"});

            const role = await this.app.getRoleById(id);
            if (!role){
                return res.status(404)
                .json({error: "Usuario no encontrado"})
            }
            return res.status(200).json(role);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500)
                .json({ error: "Error interno del servidor", details: error.message});
            }
            return res.status(500)
            .json({error: "Error interno del servidor"})
        }
    }

    async getRoleByName(req: Request, res: Response): Promise<Response> { 
        try { // Validación del email usando Joi 
            const { name } = loadRoleData(req.params);  
            const role = await this.app.getRoleByName(name);  
            if (!role) { 
                return res.status(404).json  ({message: "Role no encontrado"});
            }  
            return res.status(200).json(role); } 
        catch (error) { 
            if (error instanceof Error) { 
                return res.status(400).json({ error: error.message });  
            }
            return res.status(500).json({ error: "Error interno del servidor", 
                details: error instanceof Error ? error.message : "Error desconocido",});
        }
    }

    async getAllRoles(req: Request, res: Response): Promise<Response> { 
        try { const roles = await this.app.getAllRoles(); 
            return res.status(200).json(roles); 
        }catch (error) { 
            return res.status(500).json({ message: "Error al obtener roles", error });
        }
    }
}