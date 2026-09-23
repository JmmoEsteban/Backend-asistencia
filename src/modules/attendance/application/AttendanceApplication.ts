//import { number } from "joi";
import type { Attendance } from "../domain/Attendance";
import type { AttendancePort } from "../domain/AttendancePort";

export class AttendanceApplication{
    private port: AttendancePort;

    constructor(port: AttendancePort){
        this.port = port;
    }

    async createAttendance(attendance: Omit<Attendance, "id">): Promise<number>{
        const existAttendance = await this.port.getAttendanceByUser(attendance.user_id);
        // if (existAttendance){
        //     throw new Error("El usuario ya cuenta con registro de asistencia");
        // }
        return this.port.createAttendance(attendance);
    };

    async getAttendanceById(id: number): Promise<Attendance | null>{
        return await this.port.getAttendanceById(id);
    }

    async getAttendanceByDate(date: Date): Promise<Attendance[] | null>{
        return await this.port.getAttendanceByDate(date);
    }

    async getAttendanceByUser(Userid: number): Promise<Attendance[] | null>{
        return await this.port.getAttendanceByUser(Userid);
    }

    async getAttendanceBySession(Sessionid: number): Promise<Attendance[] | null>{
        return await this. port.getAttendanceBySession(Sessionid);
    }

    async getAllAttendance(): Promise<Attendance[]>{
        return await this.port.getAllAttendance();
    }

    async updateAttendance(id: number, attendance: Partial<Attendance>): Promise<boolean>{
        const existAttendance = this.port.getAttendanceById(id);
        if (!existAttendance){
            throw new Error("Asistencia no encontrada"); 
        }
        return await this.port.updateAttendance(id, attendance);
    }

    async deleteAttendance(id: number): Promise<boolean>{
        return await this.port.deleteAttendance(id);
    }

}