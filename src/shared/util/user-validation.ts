import Joi from 'joi';

export type ReturnUserData = {
    user_first_name: string,
    user_last_name: string,
    user_email: string,
    user_password: string,
    user_microsoft_id: string,
    user_auth_provider: string,
    user_job_title: string,
    user_department: string,
    user_office_location: string,
    user_mobile_phone: string,
    user_business_phones: string,
    user_permissions: JSON, 
    user_role_id: number,
    user_program_id: number,
    user_status_id: number,
    user_created_at: Date
}

type validationUserData = {
    error: Joi.ValidationError | undefined;
    value: ReturnUserData;
}

function validateUserData(data: any): validationUserData{
    const userSchema = Joi.object({
        nombre: Joi.string()
        .trim()
        .min(3)
        .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/)
        .required()
        .messages({
            'string.base': 'El nombre debe ser un texto', 
            'string. empty': 'El nombre es requerido', 
            'string.min': 'El nombre debe tener al menos 3 caracteres', 
            'string.pattern.base': 'El nombre solo puede contener letras y un espacio'
        }),
        email: Joi.string()
        .email({tlds: {allow: false}})
        .required()
        .messages({
            'string.email': 'Correo electronico no valido', 
            'string. empty': 'El correo es requerido', 
        }),
        contraseña: Joi.string()
        .min(6)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .required()
        .messages ({ 
            'string.min': 'La contrasena debe tener al menos 6 caracteres', 'string.pattern.base': 'La contrasena debe tener letras y números', 'string.empty': 'La contraseña es requerida', 
        }),
        telefono: Joi.string()
        .required()
        .messages({
            'string.empty': 'El teléfono es requerido',
        }),

        rol: Joi.string()
        .required()
        .messages({
            'string.empty': 'El rol es requerido',
        }),
        status: Joi.number()
        .valid(0, 1)
        .required()
        .messages ({ 
            'number.base': 'El estado debe ser numerico', 'any.only': 'El estado debe ser 0 o 1', 'any.required': 'El estado es obligatorio',  
        }),
    }).unknown(false);
    
    const {error, value} = userSchema.validate(data, {abortEarly:false});
    return {error, value};
}

export const loadUserData = (data: any): ReturnUserData => { 
    const result = validateUserData(data); 
    if (result.error) { 
        // Une todos los mensajes en una sola cadena (o podrías retornar un array) 
        const message = result.error.details.map(d => d.message).join(','); 
        throw new Error(message);  
    }
return result.value;  
}