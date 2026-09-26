import { Router } from "express";
import { PromotionAdapter } from "../adapter/PromotionAdapter";
import { PromotionApplication } from "../../application/PromotionApplication";
import { PromotionController } from "../controller/PromotionController";

const router = Router();

const promotionAdapter = new PromotionAdapter();
const promotionApp = new PromotionApplication(promotionAdapter);
const promotionController = new PromotionController(promotionApp);

router.post("/promociones", async (req, res) => {
    try {
        await promotionController.createPromotion(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la creacion de la promocion", error });
    }
});

router.get("/promociones", async (req, res) => {
    try {
        await promotionController.getAllPromotions(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de las promociones" });
    }
});

router.get("/promociones/id/:id", async (req, res) => {
    try {
        await promotionController.getPromotionById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de la promocion" });
    }
});

router.get("/promociones/programaid/:programaid", async (req, res) => {
    try {
        await promotionController.getPromotionsByProgram(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la obtencion de las promociones por programa" });
    }
});

router.put("/promociones/actualizar/id/:id", async (req, res) => {
    try {
        await promotionController.updatePromotion(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la actualizacion de la promocion" });
    }
});

router.put("/promociones/eliminar/id/:id", async (req, res) => {
    try {
        await promotionController.deletePromotion(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la eliminacion de la promocion" });
    }
});

router.delete("/promociones/eliminar/id/:id", async (req, res) => {
    try {
        await promotionController.deletePromotion(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la eliminacion de la promocion" });
    }
});

export default router;
