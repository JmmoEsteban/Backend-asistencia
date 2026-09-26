import { Router } from "express";
import { GroupAdapter } from "../adapter/GroupAdapter";
import { GroupApplication } from "../../application/GroupApplication";
import { GroupController } from "../controller/GroupController";

const router = Router();

const groupAdapter = new GroupAdapter();
const groupApp = new GroupApplication(groupAdapter);
const groupController = new GroupController(groupApp);

router.post("/grupos", async (req, res) => {
    try {
        await groupController.createGroup(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la creacion del grupo", error });
    }
});

router.get("/grupos", async (req, res) => {
    try {
        await groupController.getAllGroups(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de los grupos" });
    }
});

router.get("/grupos/id/:id", async (req, res) => {
    try {
        await groupController.getByIdGroup(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion del grupo" });
    }
});

router.put("/grupos/actualizar/id/:id", async (req, res) => {
    try {
        await groupController.updateGroup(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la actualizacion del grupo" });
    }
});

router.put("/grupos/eliminar/id/:id", async (req, res) => {
    try {
        await groupController.deleteGroup(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la eliminacion del grupo" });
    }
});

router.delete("/grupos/eliminar/id/:id", async (req, res) => {
    try {
        await groupController.deleteGroup(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la eliminacion del grupo" });
    }
});

export default router;
