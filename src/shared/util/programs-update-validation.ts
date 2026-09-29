import Joi from 'joi';

export type ReturnProgramsData= Partial<{
    name : string;
    id_subject: number;
}>;

type ValidationUpdateProgramsData={
    error: Joi.ValidationError | undefined;
    value: ReturnProgramsData;
}

function validateProgramsData(data: any): ValidationUpdateProgramsData{
    const programsSchema= Joi.object({
        name : Joi.string().messages({'name.base' : 'el nombre debe ser valido'}),
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