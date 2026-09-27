import Joi from "joi";

export type ReturnPromotionData = Partial<{
    name_promotion: string;
    id_programs: number;
    status_promotions: number;
}>;

type ValidationUpdatePromotionData = {
    error: Joi.ValidationError | undefined;
    value: ReturnPromotionData;
};

function validatePromotionData(data: any): ValidationUpdatePromotionData {
    const promotionSchema = Joi.object({
        name_promotion: Joi.string().max(150).messages({
            'string.empty': 'El nombre de la promoción no puede estar vacío',
            'string.max': 'El nombre de la promoción no puede tener más de 150 caracteres',
        }),
        id_programs: Joi.number().integer().positive().messages({
            'number.base': 'El ID del programa debe ser un número',
            'number.integer': 'El ID del programa debe ser entero',
            'number.positive': 'El ID del programa debe ser positivo',
        }),
        status_promotions: Joi.number().integer().positive().messages({
            'number.base': 'El estado de la promoción debe ser un número',
            'number.integer': 'El estado de la promoción debe ser entero',
            'number.positive': 'El estado de la promoción debe ser positivo',
        }),
    })
        .unknown(false)
        .or("name_promotion", "id_programs", "status_promotions");

    const { error, value } = promotionSchema.validate(data, { abortEarly: false, stripUnknown: true, convert: true });
    return { error, value };
}

export const loadUpdatePromotionData = (data: any): ReturnPromotionData => {
    const result = validatePromotionData(data);
    if (result.error) {
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
};
