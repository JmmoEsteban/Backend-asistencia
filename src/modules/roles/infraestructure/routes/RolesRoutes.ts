import { Router } from "express";
import { RoleAdapter } from "../adapter/RolesAdapter";
import { RolesApplication } from "../../application/RolesApplication";
import { RoleController } from "../controller/RolesController";
import { authenticateToken } from "../../../../web/authMiddleware";

const router = Router();
//inicaializacion de las capas
const userAdapter = new RoleAdapter();
const userApp = new RolesApplication(userAdapter);
const roleController = new RoleController(userApp);

//definicion de las rutas
router.get("/roles", async(req, res)=>{
    try {
        await roleController.getAllRoles(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

router.get("/roles/id/:id", async (req, res)=>{
    try {
        await roleController.getRoleById(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

router.get("/users/name/:name", async (req, res)=>{
    try {
        await roleController.getRoleByName(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

export default router;