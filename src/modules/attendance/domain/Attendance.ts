import type { Session } from "../../session/infraestructure/entities/Session";
import type { User } from "../../users/infraestructure/entities/User";

export interface Attendance {
    id: number;
    date: string;
    user_id: number,
    session_id: number;
    status: number;
    user: User,
    session: Session
}