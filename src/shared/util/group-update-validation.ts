import Joi from "joi";

export type ReturnGroupData = Partial<{
    group_acces_code: string;
    id_subjects: number;
    id_promotion: number;
    id_programs: number;
}>;

type ValidationUpdateGroupData = {
    error: Joi.ValidationError | undefined;
    value: ReturnGroupData;
};

function validateGroupData(data: any): ValidationUpdateGroupData {
    const groupSchema = Joi.object({
        group_acces_code: Joi.string().max(15).messages({
            'string.empty': 'El código de acceso no puede estar vacío',
            'string.max': 'El código de acceso no puede tener más de 15 caracteres',
        }),
        id_subjects: Joi.number().integer().positive().messages({
            'number.base': 'El ID de la materia debe ser un número',
            'number.integer': 'El ID de la materia debe ser entero',
            'number.positive': 'El ID de la materia debe ser positivo',
        }),
        id_promotion: Joi.number().integer().positive().messages({
            'number.base': 'El ID de la promoción debe ser un número',
            'number.integer': 'El ID de la promoción debe ser entero',
            'number.positive': 'El ID de la promoción debe ser positivo',
        }),
        id_programs: Joi.number().integer().positive().messages({
            'number.base': 'El ID del programa debe ser un número',
            'number.integer': 'El ID del programa debe ser entero',
            'number.positive': 'El ID del programa debe ser positivo',
        }),
    })
        .unknown(false)
        .or("group_acces_code", "id_subjects", "id_promotion", "id_programs");

    const { error, value } = groupSchema.validate(data, { abortEarly: false, stripUnknown: true, convert: true });
    return { error, value };
}

export const loadUpdateGroupData = (data: any): ReturnGroupData => {
    const result = validateGroupData(data);
    if (result.error) {
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
};
