import Joi from "joi";

export type ReturnSessionData={
    date : Date;
    day : number;
    group_id: number;
    status: number;
}

type ValidationSessionData={
    error: Joi.ValidationError | undefined;
    value: ReturnSessionData;
}

function validateSessionData(data: any): ValidationSessionData{
    const sessionSchema= Joi.object({
        date : Joi.date().required().messages({'date.empty' : 'la fecha es requerida'}),
        day : Joi.number().required().integer().messages({
            'number.empty' : 'El dia es requerido', 'number.integer' : 'El dia del usuario debe ser entero'}),
        group_id : Joi.number().required().integer().messages({
            'number.empty' : 'El ID del grupo es requerido', 'number.integer' : 'El ID del grupo debe ser entero'}),
        status : Joi.number().required().integer().valid(0, 1).messages({
            'number.empty' : 'El status es requerido', 'number.integer' : 'El status debe ser entero', 'any.only' : 'El status solo puede ser 0 o 1'}),
    }).unknown(false);

    const {error, value} = sessionSchema.validate(data, {abortEarly:false});
    return {error, value};

}

export const loadSessionData = (data: any): ReturnSessionData => {
    const result = validateSessionData(data);
    if (result.error){
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
}