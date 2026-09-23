import type { Attendance } from "./Attendance";

export interface AttendancePort{
    createAttendance(attendance: Omit<Attendance, "id">): Promise<number>;
    updateAttendance(id: number, attendance: Partial<Attendance>): Promise<boolean>;
    deleteAttendance(id: number): Promise<boolean>;
    getAttendanceById(id: number): Promise<Attendance | null>;
    getAttendanceByDate(date: Date): Promise<Attendance[] | null>;
    getAttendanceBySession(Sessionid: number): Promise<Attendance[] | null>;
    getAttendanceByUser(Userid:number): Promise<Attendance[] | null>;
    getAllAttendance(): Promise<Attendance[]>;
}