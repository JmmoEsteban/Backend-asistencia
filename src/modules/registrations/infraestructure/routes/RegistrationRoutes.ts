import { Router } from "express";
import { RegistrationAdapter } from "../adapter/RegistrationAdapter";
import { RegistrationController } from "../controller/RegistrationController";
import { RegistrationApplication } from "../../application/RegistrationApplication";

const router = Router();
//inicaializacion de las capas
const registrationAdapter = new RegistrationAdapter();
const registrationApp = new RegistrationApplication(registrationAdapter);
const userController = new RegistrationController(registrationApp);

//definicion de las rutas

router.get("/registrations", async(req, res)=>{
    try {
        await userController.getAllRegistrations(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

router.get("/registrations/id/:id", async (req, res)=>{
    try {
        await userController.getRegistrationById(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

router.get("/registrations/user/:user", async (req, res)=>{
    try {
        await userController.getRegistrationByUser(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

router.get("/registrations/group/:group", async (req, res)=>{
    try {
        await userController.getRegistrationsByGroups(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

export default router;