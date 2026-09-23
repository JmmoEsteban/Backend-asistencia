import express, {type Request, type Response} from "express";
import cors from "cors";
import userRoutes from "../modules/users/infraestructure/routes/UserRoutes";
import AttendanceRoutes from "../modules/attendance/infraestructure/routes/AttendanceRoutes";

class App{
    private app: express.Application;

    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares():void{
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes(): void{
        this.app.use("/api",userRoutes);
        this.app.use("/api",AttendanceRoutes);
    }

    getApp(){
        return this.app;
    }
}

export default new App().getApp();