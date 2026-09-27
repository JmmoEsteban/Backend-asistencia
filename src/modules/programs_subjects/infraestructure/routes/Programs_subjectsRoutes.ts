import { Router } from "express";
import { Programs_subjectsAdapter } from "../adapter/Programs_subjectsAdapter";
import { Programs_subjectsController } from "../controller/Programs_subjectsController";
import { Programs_subjectsApplication } from "../../application/Programs_subjectsApplication";

const router = Router();
//inicaializacion de las capas
const programs_subjectsAdapter = new Programs_subjectsAdapter();
const programs_subjectsApp = new Programs_subjectsApplication(programs_subjectsAdapter);
const programs_subjectsController = new Programs_subjectsController(programs_subjectsApp);

//definicion de las rutas

router.get("/programasmaterias", async(req, res)=>{
    try {
        await programs_subjectsController.getAllPrograms_subjects(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

router.get("/programasmaterias/id/:id", async (req, res)=>{
    try {
        await programs_subjectsController.getPrograms_subjectsById(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

router.get("/programasmaterias/subjects/:subjects", async (req, res)=>{
    try {
        await programs_subjectsController.getPrograms_subjectsBySubjects(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

router.get("/programasmaterias/programs/:programs", async (req, res)=>{
    try {
        await programs_subjectsController.getPrograms_subjectsByPrograms(req, res);
    } catch (error) {
        res.status(500).json({message: "Error en la consulta de datos", error});
    }
})

export default router;