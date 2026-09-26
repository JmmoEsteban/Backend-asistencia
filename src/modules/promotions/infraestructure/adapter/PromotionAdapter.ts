import type { Repository } from "typeorm";
import { Promotion as PromotionEntity } from "../entities/Promotion";
import type { Promotion as PromotionDomain } from "../../domain/Promotion";
import type { PromotionPort } from "../../domain/PromotionPort";
import { AppDataSource } from "../../../../shared/config/data-base";

export class PromotionAdapter implements PromotionPort {
    private promotionRepository: Repository<PromotionEntity>;

    constructor(){
        this.promotionRepository = AppDataSource.getRepository(PromotionEntity);
    }

    private toDomain(promotion: PromotionEntity): PromotionDomain {
        return {
            promotion_id: promotion.promotion_id,
            promotion_name: promotion.promotion_name,
            id_programs: promotion.id_programs,
        };
    }

    private toEntity(promotion: Omit<PromotionDomain, "promotion_id">): PromotionEntity {
        const promotionEntity = new PromotionEntity();
        promotionEntity.promotion_name = promotion.promotion_name;
        promotionEntity.id_programs = promotion.id_programs;
        return promotionEntity;
    }

    async createPromotion(promotion: Omit<PromotionDomain, "promotion_id">): Promise<number> {
        try {
            const newPromotion = this.toEntity(promotion);
            const savedPromotion = await this.promotionRepository.save(newPromotion);
            return savedPromotion.promotion_id;
        } catch (error) {
            console.error("Error creando promocion", error);
            throw new Error("Error al crear promocion");
        }
    }

    async updatePromotion(id: number, promotion: Partial<PromotionDomain>): Promise<boolean> {
        try {
            const existPromotion = await this.promotionRepository.findOne({ where: { promotion_id: id } });
            if (!existPromotion) return false;

            Object.assign(existPromotion, {
                promotion_name: promotion.promotion_name ?? existPromotion.promotion_name,
                id_programs: promotion.id_programs ?? existPromotion.id_programs,
            });

            await this.promotionRepository.save(existPromotion);
            return true;
        } catch (error) {
            console.error("Error actualizando promocion", error);
            throw new Error("Error al actualizar promocion");
        }
    }

    async deletePromotion(id: number): Promise<boolean> {
        try {
            const existPromotion = await this.promotionRepository.findOne({ where: { promotion_id: id } });
            if (!existPromotion) return false;

            await this.promotionRepository.remove(existPromotion);
            return true;
        } catch (error) {
            console.error("Error al eliminar promocion", error);
            throw new Error("Error al eliminar promocion");
        }
    }

    async getPromotionById(id: number): Promise<PromotionDomain | null> {
        try {
            const promotion = await this.promotionRepository.findOne({ where: { promotion_id: id } });
            return promotion ? this.toDomain(promotion) : null;
        } catch (error) {
            console.error("Error obteniendo promocion por ID", error);
            throw new Error("Error al obtener promocion por ID");
        }
    }

    async getAllPromotions(): Promise<PromotionDomain[]> {
        try {
            const promotions = await this.promotionRepository.find();
            return promotions.map((p) => this.toDomain(p));
        } catch (error) {
            console.error("Error obteniendo todas las promociones", error);
            throw new Error("Error al obtener todas las promociones");
        }
    }

    async getPromotionsByProgram(programId: number): Promise<PromotionDomain[] | null> {
        try {
            const promotions = await this.promotionRepository.find({ where: { id_programs: programId } });
            return promotions ? promotions.map((p) => this.toDomain(p)) : null;
        } catch (error) {
            console.error("Error obteniendo promociones por programa", error);
            throw new Error("Error al obtener promociones por programa");
        }
    }
}
