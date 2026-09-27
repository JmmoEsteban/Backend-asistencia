import Joi from "joi";

export type ReturnProgramsData={
    name : string;
}

type ValidationProgramsData={
    error: Joi.ValidationError | undefined;
    value: ReturnProgramsData;
}

function validateProgramsData(data: any): ValidationProgramsData{
    const programsSchema= Joi.object({
        name : Joi.string().required().messages({'name.empty' : 'el nombre es requerido'}),
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