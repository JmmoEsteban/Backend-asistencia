import { Router } from "express";
import { AttendanceAdapter } from "../adapter/AttendanceAdapter";
import { AttendanceApplication } from "../../application/AttendanceApplication";
import { AttendanceController } from "../controller/AttendanceController";

const router = Router();

const attendanceAdapter = new AttendanceAdapter();
const attendanceApp = new AttendanceApplication(attendanceAdapter);
const attendanceController = new AttendanceController(attendanceApp);

router.post("/asistencias", async (req,res)=>{
    try {
        await attendanceController.createAttendance(req,res);
    } catch (error) {
        res.status(500).json({ message: "Error en la creacion de la asistencia", error });
    }
})

router.get("/asistencias", async (req, res)=>{
    try {
        await attendanceController.getAllAttendance(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de las asistencias"});
    }
})

router.get("/asistencias/id/:id", async (req, res)=>{
    try {
        await attendanceController.getAttendanceById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de la asistencia"});
    }
})

router.get("/asistencias/userid/:userid", async (req, res)=>{
    try {
        await attendanceController.getAttendanceByUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de las asistencias del usuario"});
    }
})

router.get("/asistencias/sesionid/:sesionid", async (req, res)=>{
    try {
        await attendanceController.getAttendanceBySession(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de las asistencias de la sesion"});
    }
})

router.put("/asistencias/actualizar/id/:id", async (req, res)=>{
    try {
        await attendanceController.updateAttendance(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la actualizacion de la asistencia"});
    }
})

router.put("/asistencias/eliminar/id/:id", async (req, res)=>{
    try {
        await attendanceController.deleteAttendance(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la eliminacion de la asistencia"});
    }
})

export default router;