import Joi from 'joi';

export type ReturnAttendanceData= Partial<{
    date : Date;
    user_id : number;
    session_id: number;
    status: number;
}>;

type ValidationUpdateAttendanceData={
    error: Joi.ValidationError | undefined;
    value: ReturnAttendanceData;
}

function validateAttendanceData(data: any): ValidationUpdateAttendanceData{
    const attendanceSchema= Joi.object({
        date : Joi.date().messages({'date.base' : 'la fecha debe ser valida'}),
        user_id : Joi.number().integer().messages({
            'number.base' : 'El ID del usuario debe ser un numero', 'number.integer' : 'El ID del usuario debe ser entero'}),
        session_id : Joi.number().integer().messages({
            'number.base' : 'El ID de la sesion debe ser un numero', 'number.integer' : 'El ID de la sesion debe ser entero'}),
        status : Joi.number().integer().valid(0, 1).messages({
            'number.base': 'El status debe ser un número',
            'number.integer': 'El status debe ser entero',
            'any.only': 'El status solo puede ser 0 o 1',})
    }).unknown(false)
    .or("date", "user_id", "session_id", "status");

    const {error, value} = attendanceSchema.validate(data, {abortEarly:false, stripUnknown: true, convert: true});
    return {error, value};

}

export const loadUpdateAttendanceData = (data: any): ReturnAttendanceData => {
    const result = validateAttendanceData(data);
    if (result.error){
        const message = result.error.details.map(d => d.message).join(', ');
        throw new Error(message);
    }
    return result.value;
}