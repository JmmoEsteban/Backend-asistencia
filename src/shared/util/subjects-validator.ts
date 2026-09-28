import Joi from "joi";

export type ReturnSubjectsData={
    name : string;
    status: number;
}

type ValidationSubjectsData={
    error: Joi.ValidationError | undefined;
    value: ReturnSubjectsData;
}

function validateSubjectsData(data: any): ValidationSubjectsData{
    const subjectsSchema= Joi.object({
        name : Joi.string().required().messages({'name.empty' : 'el nombre es requerido'}),
        status : Joi.number().required().integer().valid(0, 1).messages({
            'number.empty' : 'El status es requerido', 'number.integer' : 'El status debe ser entero', 'any.only' : 'El status solo puede ser 0 o 1'}),
    }).unknown(false);

    const {error, value} = subjectsSchema.validate(data, {abortEarly:false});
    return {error, value};

}

export const loadSubjectsData = (data: any): ReturnSubjectsData => {
    const result = validateSubjectsData(data);
    if (result.error){
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
}