import dotenv from "dotenv";
import { User } from "../../modules/users/infraestructure/entities/User";
import { DataSource } from "typeorm";
import envs from "./environment-vars"
import { Attendance } from "../../modules/attendance/infraestructure/entities/Attendance";
import { Session } from "../../modules/session/infraestructure/entities/Session";

dotenv.config();
export const AppDataSource = new DataSource ({
    type: "postgres",
    port: Number(envs.DB_PORT),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: true,
    logging:true,
    entities: [User, Attendance, Session],
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