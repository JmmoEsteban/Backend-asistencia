import type { Repository } from "typeorm";
import type { Attendance as AttendanceDomain } from "../../domain/Attendance";
import { Attendance as AttendanceEntity } from "../../infraestructure/entities/Attendance";
import type { AttendancePort } from "../../domain/AttendancePort";
import { AppDataSource } from "../../../../shared/config/data-base";
//import { object } from "joi";

export class AttendanceAdapter implements AttendancePort{

    private attendanceRepository: Repository<AttendanceEntity>

    constructor(){
        this.attendanceRepository = AppDataSource.getRepository(AttendanceEntity);
    }

    private toDomain(attendance: AttendanceEntity): AttendanceDomain{
        return{
            id: attendance.id_attendance,
            date: attendance.date_attendance,
            user_id: attendance.id_user,
            session_id: attendance.id_session,
            status: attendance.status_attendance
        }
    }

    private toEntity(attendance: Omit<AttendanceDomain, "id">): AttendanceEntity{
        const attendanceEntity = new AttendanceEntity();
        attendanceEntity.date_attendance = attendance.date;
        attendanceEntity.id_user = attendance.user_id;
        attendanceEntity.id_session = attendance.session_id;
        attendanceEntity.status_attendance = attendance.status;
        return attendanceEntity;
    }

    async createAttendance(attendance: Omit<AttendanceDomain, "id">): Promise<number> {
        try {
            const newAttendance = this.toEntity(attendance);
            const savedAttendance = await this.attendanceRepository.save(newAttendance);
            return savedAttendance.id_attendance;
        } catch (error) {
            console.error("Error creando asistencia", error);
            throw new Error("Error al crear asistencia");
        }
    }
    async updateAttendance(id: number, attendance: Partial<AttendanceDomain>): Promise<boolean> {
        try {
            const existAttendance = await this.attendanceRepository.findOne({ where: { id_attendance: id }});
            if (!existAttendance) return false;

            Object.assign(existAttendance, {
                date_attendance: attendance.date ?? existAttendance.date_attendance,
                id_user: attendance.user_id ?? existAttendance.id_user,
                id_session: attendance.session_id ?? existAttendance.id_session,
                status_attendance: attendance.status ?? existAttendance.status_attendance
            });

            await this.attendanceRepository.save(existAttendance);
            return true;

        } catch (error) {
            console.error("Error actualizando la asistencia");
            throw new Error("Error al actualizar la asistencia");
        }
    }
    async deleteAttendance(id: number): Promise<boolean> {
        try {
            const existAttendance = await this.attendanceRepository.findOne({where: {id_attendance: id}});
            if (!existAttendance) return false;
            Object.assign(existAttendance, {
                status_attendance: 0
            })
            await this.attendanceRepository.save(existAttendance);
            return true;
        } catch (error) {
            console.error("Error al dar de baja el registro de asistencia");
            throw new Error("Error al dar de baja la asistencia");
        }
    }
    async getAttendanceById(id: number): Promise<AttendanceDomain | null> {
        try {
            const attendance = await this.attendanceRepository.findOne({where: {id_attendance: id}});
            return attendance ? this.toDomain(attendance) : null;
        } catch (error) {
            console.error("Error obteniendo asistencia por ID");
            throw new Error("Error al obtener asistencia por ID");
        }
    }
    async getAttendanceByDate(date: Date): Promise<AttendanceDomain[] | null> {
        try {
            const attendance = await this.attendanceRepository.find({where: {date_attendance: date}});
            return attendance ? attendance.map(this.toDomain) : null;
        } catch (error) {
            console.error("Error obteniendo asistemcia por fecha");
            throw new Error("Error al obtener asistencia por fecha");
        }
    }
    async getAttendanceBySession(Sessionid: number): Promise<AttendanceDomain[] | null> {
        try {
            const attendance = await this.attendanceRepository.find({where: {id_session: Sessionid}});
            return attendance ? attendance.map(this.toDomain) : null;
        } catch (error) {
            console.error("Error obteniendo la asistencia por sesion");
            throw new Error("Error al obtener la asistencia por sesion");
        }
    }
    async getAttendanceByUser(Userid: number): Promise<AttendanceDomain[] | null> {
        try {
            const attendance = await this.attendanceRepository.find({where: {id_user: Userid}});
            return attendance ? attendance.map(this.toDomain) : null;
        } catch (error) {
            console.error("Error obteniendo la asistencia por usuario", error);
            throw new Error("Error al obtener la asistencia por usuario");
        }
    }
    async getAllAttendance(): Promise<AttendanceDomain[]> {
        try {
            const attendance = await this.attendanceRepository.find({where: {status_attendance: 1}});
            return attendance.map(this.toDomain);
        } catch (error) {
            console.error("Error obteniendo todas las asistencias");
            throw new Error("Error al obtener todas las asistencias");
        }
    }

}