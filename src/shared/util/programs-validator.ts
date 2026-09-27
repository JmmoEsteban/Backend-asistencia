import Joi from "joi";

export type ReturnProgramsData={
    name : string;
    status: number;
}

type ValidationProgramsData={
    error: Joi.ValidationError | undefined;
    value: ReturnProgramsData;
}

function validateProgramsData(data: any): ValidationProgramsData{
    const programsSchema= Joi.object({
        name : Joi.date().required().messages({'name.empty' : 'el nombre es requerido'}),
        status : Joi.number().required().integer().valid(0, 1).messages({
            'number.empty' : 'El status es requerido', 'number.integer' : 'El status debe ser entero', 'any.only' : 'El status solo puede ser 0 o 1'}),
    }).unknown(false);

    const {error, value} = programsSchema.validate(data, {abortEarly:false});
    return {error, value};

}

export const loadProgramsData = (data: any): ReturnProgramsData => {
    const result = validateProgramsData(data);
    if (result.error){
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
}