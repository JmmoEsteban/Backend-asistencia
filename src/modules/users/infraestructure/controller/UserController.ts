import type { UserApplication } from "../../application/UserApplication";
import type { Request, Response } from "express";
import { loadUserData } from "../../../../shared/util/user-validation";
import type { User } from "../../domain/User";
import { loadUpdateUserData } from "../../../../shared/util/user-update-validation";
import { loadEmail } from "../../../../shared/util/email.validation";

export class UserController {

    private app: UserApplication;

    constructor(application: UserApplication){
        this.app = application;
    }

    async login(req: Request, res: Response):Promise<string | Response>{
        try {
            const {email, contraseña} = req.body;
            if(!email || !contraseña){
                return res.status(400)
                .json({error: "Email y contraseña requeridos"});
            }
            const token = await this.app.login(email, contraseña);
            return res.status(200)
            .json({message: "Login éxitoso", token})
        } catch (error) {
            return res.status(401).json({ error: "Credenciales Invalidas" });
        }
    }

    async createUser (req: Request, res: Response): Promise<Response>{
        try {
            //validar datos de entrada
            const {nombre, email, contraseña, telefono, rol, status} = loadUserData (req.body);
            const user: Omit<User, "id"> = {nombre, email, contraseña, telefono, rol, status};

            const userId = await this.app.createUser(user);
            return res.status(201).json({message: "Usuario creado con éxito", userId});
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({ error: "Error interno del servidor ", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
    async UpdateUser(req: Request, res: Response):Promise<Response>{
        try {
            const id = Number(req.params.id);
            if(Number.isNaN(id)){
                return res.status(400).json({error: "ID inválido"});
            }

            const dataLoad = loadUpdateUserData(req.body);
            const updated =  await this.app.updateUser(id, dataLoad);
            if (!updated){
                return res.status(404)
                .json({error: "Usuario no encontrado o sin cambios"});
            }
            return res.status(200)
                .json({error: "Usuario se actualizo correctamente"});
        } catch (error) {
            if (error instanceof Error){
                return res.status(400).json({ error: error.message});
            }
            return res.status(500)
            .json({error: "Error interno del servidor"})
        }
    }

    async getUserById(req: Request, res: Response):Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400)
                .json({error: "ID inválido"});

            const user = await this.app.getUserById(id);
            if (!user){
                return res.status(404)
                .json({error: "Usuario no encontrado"})
            }
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500)
                .json({ error: "Error interno del servidor", details: error.message});
            }
            return res.status(500)
            .json({error: "Error interno del servidor"})
        }
    }

    async getUserByEmail(req: Request, res: Response): Promise<Response> { 
        try { // Validación del email usando Joi 
            const { email } = loadEmail(req.params);  
            const user = await this.app.getUserByEmail(email);  
            if (!user) { 
                return res.status(404).json  ({message: "Usuario no encontrado"});
            }  
            return res.status(200).json(user); } 
        catch (error) { 
            if (error instanceof Error) { 
                return res.status(400).json({ error: error.message });  
            }
            return res.status(500).json({ error: "Error interno del servidor", 
                details: error instanceof Error ? error.message : "Error desconocido",});
        }
    }

    async getUserByRol(req: Request, res: Response): Promise<Response> { 
        try {    
            const { rol } = req.params;
            if (typeof rol !== "string" || rol.trim() === "") {
                return res.status(400).json({
                error: "El rol es obligatorio y debe ser válido"
                });
            }
            const user = await this.app.getUserByRol(rol);  
            if (!user) { 
                return res.status(404).json({ message: "Usuario no encontrado" });
            }  
            return res.status(200).json(user); 
        } catch (error) { 
            if (error instanceof Error) { 
                return res.status(400).json({ error: error.message });  
            }
            return res.status(500).json({ error: "Error interno del servidor", 
                details: error instanceof Error ? error.message : "Error desconocido",});
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<Response> { 
        try { const users = await this.app.getAllUsers(); 
            return res.status(200).json(users); 
        }catch (error) { 
            return res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> { 
        try {
            const id = Number(req.params.id); 
            if (Number.isNaN(id)) return res.status(400)
                .json({ error: "ID inválido" });  
            const deleted = await this.app.deleteUser(id); 
            if (!deleted) return res.status(404)
                .json({ error: "Usuario no encontrado" });  
            return res.status(200).json({ message: "Usuario eliminado con éxito" }); 
        }catch (error) { 
            if (error instanceof Error) { 
                return res .status (500) 
                .json({ error: "Error interno del servidor", details: error.message, });  
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}