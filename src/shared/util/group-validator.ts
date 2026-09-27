import Joi from "joi";

export type ReturnGroupData = {
    access_code_group: string;
    id_subjects: number;
    id_promotions: number;
    id_programs: number;
    status_group: number;
};

type ValidationGroupData = {
    error: Joi.ValidationError | undefined;
    value: ReturnGroupData;
};

function validateGroupData(data: any): ValidationGroupData {
    const groupSchema = Joi.object({
        access_code_group: Joi.string().max(15).required().messages({
            'string.empty': 'El código de acceso es requerido',
            'string.max': 'El código de acceso no puede tener más de 15 caracteres',
        }),
        id_subjects: Joi.number().required().integer().positive().messages({
            'number.empty': 'El ID de la materia es requerido',
            'number.base': 'El ID de la materia debe ser un número',
            'number.integer': 'El ID de la materia debe ser entero',
            'number.positive': 'El ID de la materia debe ser positivo',
        }),
        id_promotions: Joi.number().required().integer().positive().messages({
            'number.empty': 'El ID de la promoción es requerido',
            'number.base': 'El ID de la promoción debe ser un número',
            'number.integer': 'El ID de la promoción debe ser entero',
            'number.positive': 'El ID de la promoción debe ser positivo',
        }),
        id_programs: Joi.number().required().integer().positive().messages({
            'number.empty': 'El ID del programa es requerido',
            'number.base': 'El ID del programa debe ser un número',
            'number.integer': 'El ID del programa debe ser entero',
            'number.positive': 'El ID del programa debe ser positivo',
        }),
        status_group: Joi.number().required().integer().positive().messages({
            'number.empty': 'El estado del grupo es requerido',
            'number.base': 'El estado del grupo debe ser un número',
            'number.integer': 'El estado del grupo debe ser entero',
            'number.positive': 'El estado del grupo debe ser positivo',
        }),
    }).unknown(false);

    const { error, value } = groupSchema.validate(data, { abortEarly: false });
    return { error, value };
}

export const loadGroupData = (data: any): ReturnGroupData => {
    const result = validateGroupData(data);
    if (result.error) {
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
};
