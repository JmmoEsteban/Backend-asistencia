import Joi from 'joi';

export type ReturnRoleData = {
    name: string
}

type validationRoleData = {
    error: Joi.ValidationError | undefined;
    value: ReturnRoleData;
}

function validateRoleData(data: any): validationRoleData{
    const userSchema = Joi.object({
        id: Joi.number()
        .valid(1, 2, 3)
        .required()
        .messages ({ 
            'number.base': 'El estado debe ser numerico', 'any.only': 'El estado debe ser 1, 2, 3', 'any.required': 'El estado es obligatorio',  
        }),
        name: Joi.string()
        .trim(false)
        .required()
        .messages({
            'string.base': 'El nombre debe ser un texto', 
            'string. empty': 'El nombre es requerido', 
            'string.pattern.base': 'El nombre solo puede contener letras'
        }),
    }).unknown(false);
    
    const {error, value} = userSchema.validate(data, {abortEarly:false});
    return {error, value};
}

export const loadRoleData = (data: any): ReturnRoleData => { 
    const result = validateRoleData(data); 
    if (result.error) { 
        // Une todos los mensajes en una sola cadena (o podrías retornar un array) 
        const message = result.error.details.map(d => d.message).join(','); 
        throw new Error(message);  
    }
return result.value;  
}