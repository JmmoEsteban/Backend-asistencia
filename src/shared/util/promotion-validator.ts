import Joi from "joi";

export type ReturnPromotionData = {
    name_promotion: string;
    id_programs: number;
    status_promotions: number;
};

type ValidationPromotionData = {
    error: Joi.ValidationError | undefined;
    value: ReturnPromotionData;
};

function validatePromotionData(data: any): ValidationPromotionData {
    const promotionSchema = Joi.object({
        name_promotion: Joi.string().max(150).required().messages({
            'string.empty': 'El nombre de la promoción es requerido',
            'string.max': 'El nombre de la promoción no puede tener más de 150 caracteres',
        }),
        id_programs: Joi.number().required().integer().positive().messages({
            'number.empty': 'El ID del programa es requerido',
            'number.base': 'El ID del programa debe ser un número',
            'number.integer': 'El ID del programa debe ser entero',
            'number.positive': 'El ID del programa debe ser positivo',
        }),
        status_promotions: Joi.number().required().integer().positive().messages({
            'number.empty': 'El estado de la promoción es requerido',
            'number.base': 'El estado de la promoción debe ser un número',
            'number.integer': 'El estado de la promoción debe ser entero',
            'number.positive': 'El estado de la promoción debe ser positivo',
        }),
    }).unknown(false);

    const { error, value } = promotionSchema.validate(data, { abortEarly: false });
    return { error, value };
}

export const loadPromotionData = (data: any): ReturnPromotionData => {
    const result = validatePromotionData(data);
    if (result.error) {
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
};
