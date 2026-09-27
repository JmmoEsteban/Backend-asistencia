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
            id_promotion: promotion.id_promotion,
            name_promotion: promotion.name_promotion,
            id_programs: promotion.id_programs,
            status_promotions: promotion.status_promotions,
        };
    }

    private toEntity(promotion: Omit<PromotionDomain, "id_promotion">): PromotionEntity {
        const promotionEntity = new PromotionEntity();
        promotionEntity.name_promotion = promotion.name_promotion;
        promotionEntity.id_programs = promotion.id_programs;
        promotionEntity.status_promotions = promotion.status_promotions;
        return promotionEntity;
    }

    async createPromotion(promotion: Omit<PromotionDomain, "id_promotion">): Promise<number> {
        try {
            const newPromotion = this.toEntity(promotion);
            const savedPromotion = await this.promotionRepository.save(newPromotion);
            return savedPromotion.id_promotion;
        } catch (error) {
            console.error("Error creando promocion", error);
            throw new Error("Error al crear promocion");
        }
    }

    async updatePromotion(id: number, promotion: Partial<PromotionDomain>): Promise<boolean> {
        try {
            const existPromotion = await this.promotionRepository.findOne({ where: { id_promotion: id } });
            if (!existPromotion) return false;

            Object.assign(existPromotion, {
                name_promotion: promotion.name_promotion ?? existPromotion.name_promotion,
                id_programs: promotion.id_programs ?? existPromotion.id_programs,
                status_promotions: promotion.status_promotions ?? existPromotion.status_promotions,
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
            const existPromotion = await this.promotionRepository.findOne({ where: { id_promotion: id } });
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
            const promotion = await this.promotionRepository.findOne({ where: { id_promotion: id } });
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
