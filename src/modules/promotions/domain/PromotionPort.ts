import type { Promotion } from "./Promotion";

export interface PromotionPort {
    createPromotion(promotion: Omit<Promotion, "id_promotion">): Promise<number>;
    updatePromotion(id: number, promotion: Partial<Promotion>): Promise<boolean>;
    deletePromotion(id: number): Promise<boolean>;
    getPromotionById(id: number): Promise<Promotion | null>;
    getAllPromotions(): Promise<Promotion[]>;
    getPromotionsByProgram(programId: number): Promise<Promotion[] | null>;
}
