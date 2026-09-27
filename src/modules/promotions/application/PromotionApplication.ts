import type { Promotion } from "../domain/Promotion";
import type { PromotionPort } from "../domain/PromotionPort";

export class PromotionApplication {
    private port: PromotionPort;

    constructor(port: PromotionPort){
        this.port = port;
    }

    async createPromotion(promotion: Omit<Promotion, "id_promotion">): Promise<number> {
        return await this.port.createPromotion(promotion);
    }

    async updatePromotion(id: number, promotion: Partial<Promotion>): Promise<boolean> {
        const exist = await this.port.getPromotionById(id);
        if (!exist) {
            throw new Error("Promocion no encontrada");
        }
        return await this.port.updatePromotion(id, promotion);
    }

    async deletePromotion(id: number): Promise<boolean> {
        const exist = await this.port.getPromotionById(id);
        if (!exist) {
            throw new Error("Promocion no encontrada");
        }
        return await this.port.deletePromotion(id);
    }

    async getPromotionById(id: number): Promise<Promotion | null> {
        return await this.port.getPromotionById(id);
    }

    async getAllPromotions(): Promise<Promotion[]> {
        return await this.port.getAllPromotions();
    }

    async getPromotionsByProgram(programId: number): Promise<Promotion[] | null> {
        return await this.port.getPromotionsByProgram(programId);
    }
}
