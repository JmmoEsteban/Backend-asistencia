import { Router } from "express";
import { ProgramsAdapter } from "../adapter/ProgramsAdapter";
import { ProgramsApplication } from "../../application/ProgramsApplication";
import { ProgramsController } from "../controller/ProgramsController";

const router = Router();

const programsAdapter = new ProgramsAdapter();
const programsApp = new ProgramsApplication(programsAdapter);
const programsController = new ProgramsController(programsApp);

router.post("/programas", async (req,res)=>{
    try {
        await programsController.createPrograms(req,res);
    } catch (error) {
        res.status(500).json({ message: "Error en la creacion del programa", error });
    }
})

router.get("/programas", async (req, res)=>{
    try {
        await programsAdapter.getAllPrograms();
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de los programas"});
    }
})

router.get("/programas/id/:id", async (req, res)=>{
    try {
        await programsController.getProgramsById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion del programa"});
    }
})

router.get("/asistencias/name/:name", async (req, res)=>{
    try {
        await programsController.getProgramsByName(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de los programas"});
    }
})

router.put("/programas/actualizar/id/:id", async (req, res)=>{
    try {
        await programsController.updatePrograms(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la actualizacion del programa"});
    }
})

router.put("/programa/eliminar/id/:id", async (req, res)=>{
    try {
        await programsController.deletePrograms(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la eliminacion del programa"});
    }
})

export default router;