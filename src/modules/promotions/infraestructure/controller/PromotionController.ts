import type { Request, Response } from "express";
import type { PromotionApplication } from "../../application/PromotionApplication";
import type { Promotion } from "../../domain/Promotion";
import { loadPromotionData } from "../../../../shared/util/promotion-validator";
import { loadUpdatePromotionData } from "../../../../shared/util/promotion-update-validation";

export class PromotionController {
    private app: PromotionApplication;

    constructor(application: PromotionApplication){
        this.app = application;
    }

    async createPromotion(req: Request, res: Response): Promise<Response> {
        try {
            const { name_promotion, id_programs, status_promotions } = loadPromotionData(req.body);
            const promotion: Omit<Promotion, "id_promotion" | "Programs"> = {
                name_promotion,
                id_programs,
                status_promotions
            };
            const promotionId = await this.app.createPromotion(promotion);
            return res.status(201).json({ message: "Promocion creada con exito", promotionId });
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async updatePromotion(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)){
                return res.status(400).json({ error: "ID invalido" });
            }
            const dataLoad = loadUpdatePromotionData(req.body);
            const updated = await this.app.updatePromotion(id, dataLoad);
            if (!updated){
                return res.status(404).json({ error: "Promocion no encontrada o sin cambios" });
            }
            return res.status(200).json({ message: "Promocion actualizada con exito" });
        } catch (error) {
            if (error instanceof Error){
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getAllPromotions(req: Request, res: Response): Promise<Response> {
        try {
            const promotions = await this.app.getAllPromotions();
            return res.status(200).json(promotions);
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    async getPromotionById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido" });

            const promotion = await this.app.getPromotionById(id);
            if (!promotion) {
                return res.status(404).json({ message: "Promocion no encontrada" });
            }
            return res.status(200).json(promotion);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getPromotionsByProgram(req: Request, res: Response): Promise<Response> {
        try {
            const programId = Number(req.params.programaid);
            if (Number.isNaN(programId)) return res.status(400).json({ error: "ID invalido" });

            const promotions = await this.app.getPromotionsByProgram(programId);
            if (!promotions) {
                return res.status(404).json({ message: "Promociones no encontradas para este programa" });
            }
            return res.status(200).json(promotions);
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async deletePromotion(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalido" });

            const deleted = await this.app.deletePromotion(id);
            if (!deleted) {
                return res.status(404).json({ message: "Promocion no encontrada" });
            }
            return res.status(200).json({ message: "Promocion eliminada con exito" });
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}
