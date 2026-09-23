import Joi from "joi";

export type ReturnAttendanceData={
    date : Date;
    user_id : number;
    session_id: number;
    status: number;
}

type ValidationAttendanceData={
    error: Joi.ValidationError | undefined;
    value: ReturnAttendanceData;
}

function validateAttendanceData(data: any): ValidationAttendanceData{
    const attendanceSchema= Joi.object({
        date : Joi.date().required().messages({'date.empty' : 'la fecha es requerida'}),
        user_id : Joi.number().required().integer().messages({
            'number.empty' : 'El ID del usuario es requerido', 'number.integer' : 'El ID del usuario debe ser entero'}),
        session_id : Joi.number().required().integer().messages({
            'number.empty' : 'El ID de la sesion es requerido', 'number.integer' : 'El ID de la sesion debe ser entero'}),
        status : Joi.number().required().integer().valid(0, 1).messages({
            'number.empty' : 'El status es requerido', 'number.integer' : 'El status debe ser entero', 'any.only' : 'El status solo puede ser 0 o 1'}),
    }).unknown(false);

    const {error, value} = attendanceSchema.validate(data, {abortEarly:false});
    return {error, value};

}

export const loadAttendanceData = (data: any): ReturnAttendanceData => {
    const result = validateAttendanceData(data);
    if (result.error){
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
}