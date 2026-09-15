import dotenv from "dotenv";
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import envs from "../config/environment-vars"

dotenv.config();
export const AppDataSource = new DataSource ({
    type: "postgres",
    port: Number(envs.DB_PORT),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: true,
    logging:true,
    entities: [User],
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