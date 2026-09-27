import { Router } from "express";
import { RoleAdapter } from "../adapter/RolesAdapter";
import { RolesApplication } from "../../application/RolesApplication";
import { RoleController } from "../controller/RolesController";

const router = Router();
//inicaializacion de las capas
const roleAdapter = new RoleAdapter();
const roleApp = new RolesApplication(roleAdapter);
const roleController = new RoleController(roleApp);

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

router.get("/roles/name/:name", async (req, res)=>{
    try {
        await roleController.getRoleByName(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

export default router;