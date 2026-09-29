import dotenv from "dotenv";
import { User } from "../../modules/users/infraestructure/entities/User";
import { DataSource } from "typeorm";
import envs from "./environment-vars"
import { Attendance } from "../../modules/attendance/infraestructure/entities/Attendance";
import { Session } from "../../modules/session/infraestructure/entities/Session";
import { Group } from "../../modules/groups/infraestructure/entities/Group";
import { Promotion } from "../../modules/promotions/infraestructure/entities/Promotion";
import { Role } from "../../modules/roles/infraestructure/entities/Roles";
import { Programs } from "../../modules/programs/infraestructure/entities/Programs";
import { Registration } from "../../modules/registrations/infraestructure/entities/Registration";
import { Subjects } from "../../modules/subjects/infraestructure/entities/Subjects";
import { Programs_subjects } from "../../modules/programs_subjects/infraestructure/entities/Programs_subjects";

dotenv.config();
export const AppDataSource = new DataSource ({
    type: "postgres",
    port: Number(envs.DB_PORT),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: false,
    logging:true,
    entities: [User, Attendance, Session, Group, Promotion, Role, Programs, Registration, Subjects, Programs_subjects],
});

//conectar a la DB
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Conectado");
    } catch (error) {
        console.log("Error al conectar a la db", error);
        process.exit(1);
    }
}