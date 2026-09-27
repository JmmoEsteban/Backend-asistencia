import Joi from 'joi';

export type ReturnProgramsData= Partial<{
    name : string;
    status: number;
}>;

type ValidationUpdateProgramsData={
    error: Joi.ValidationError | undefined;
    value: ReturnProgramsData;
}

function validateProgramsData(data: any): ValidationUpdateProgramsData{
    const programsSchema= Joi.object({
        name : Joi.string().messages({'name.base' : 'el nombre debe ser valido'}),
        status : Joi.number().integer().valid(0, 1).messages({
            'number.base': 'El status debe ser un número',
            'number.integer': 'El status debe ser entero',
            'any.only': 'El status solo puede ser 0 o 1',})
    }).unknown(false)
    .or("name", "status");

    const {error, value} = programsSchema.validate(data, {abortEarly:false, stripUnknown: true, convert: true});
    return {error, value};

}

export const loadUpdateProgramsData = (data: any): ReturnProgramsData => {
    const result = validateProgramsData(data);
    if (result.error){
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
}