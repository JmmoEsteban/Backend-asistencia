import Joi from 'joi';

export type ReturnSessionData= Partial<{
    date : Date;
    day : number;
    group_id: number;
    status: number;
}>;

type ValidationUpdateSessionData={
    error: Joi.ValidationError | undefined;
    value: ReturnSessionData;
}

function validateSessionData(data: any): ValidationUpdateSessionData{
    const sessionSchema= Joi.object({
        date : Joi.date().messages({'date.base' : 'la fecha debe ser valida'}),
        day : Joi.number().integer().messages({
            'number.base' : 'El dia debe ser un numero', 'number.integer' : 'El dia debe ser entero'}),
        group_id : Joi.number().integer().messages({
            'number.base' : 'El ID del grupo debe ser un numero', 'number.integer' : 'El ID del grupo debe ser entero'}),
        status : Joi.number().integer().valid(0, 1).messages({
            'number.base': 'El status debe ser un número',
            'number.integer': 'El status debe ser entero',
            'any.only': 'El status solo puede ser 0 o 1',})
    }).unknown(false)
    .or("date", "day", "group_id", "status");

    const {error, value} = sessionSchema.validate(data, {abortEarly:false, stripUnknown: true, convert: true});
    return {error, value};

}

export const loadUpdateSessionData = (data: any): ReturnSessionData => {
    const result = validateSessionData(data);
    if (result.error){
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
}