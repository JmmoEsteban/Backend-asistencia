import { Router } from "express";
import { SubjectsAdapter } from "../adapter/SubjectsAdapter";
import { SubjectsApplication } from "../../application/SubjectsApplication";
import { SubjectsController } from "../controller/SubjectsController";

const router = Router();

const subjectsAdapter = new SubjectsAdapter();
const subjectsApp = new SubjectsApplication(subjectsAdapter);
const subjectsController = new SubjectsController(subjectsApp);

router.post("/materias", async (req,res)=>{
    try {
        await subjectsController.createSubjects(req,res);
    } catch (error) {
        res.status(500).json({ message: "Error en la creacion de la materia", error });
    }
})

router.get("/materias", async (req, res)=>{
    try {
        await subjectsController.getAllSubjects(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de las materias"});
    }
})

router.get("/materias/id/:id", async (req, res)=>{
    try {
        await subjectsController.getSubjectsById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de la materia"});
    }
})

router.get("/materias/name/:name", async (req, res)=>{
    try {
        await subjectsController.getSubjectsByName(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de las materias"});
    }
})

router.put("/materias/actualizar/id/:id", async (req, res)=>{
    try {
        await subjectsController.updateSubjects(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la actualizacion de la materia"});
    }
})

router.put("/materia/eliminar/id/:id", async (req, res)=>{
    try {
        await subjectsController.deleteSubjects(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la eliminacion de la materia"});
    }
})

export default router;