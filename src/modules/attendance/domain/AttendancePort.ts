import type { Attendance } from "./Attendance";

export interface AttendancePort{
    createAttendance(attendance: Omit<Attendance, "id" | "user" | "session">): Promise<number>;
    updateAttendance(id: number, attendance: Partial<Omit<Attendance, "user" | "session" | "user_id">>): Promise<boolean>;
    deleteAttendance(id: number): Promise<boolean>;
    getAttendanceById(id: number): Promise<Attendance | null>;
    getAttendanceByDate(date: string): Promise<Attendance[] | null>;
    getAttendanceBySession(Sessionid: number): Promise<Attendance[] | null>;
    getAttendanceByUser(Userid:number): Promise<Attendance[] | null>;
    getAllAttendance(): Promise<Attendance[]>;
}