import express, {type Request, type Response} from "express";
import cors from "cors";
import userRoutes from "../modules/users/infraestructure/routes/UserRoutes";
import AttendanceRoutes from "../modules/attendance/infraestructure/routes/AttendanceRoutes";
import SessionRoutes from "../modules/session/infraestructure/routes/SessionRoutes";
<<<<<<< Updated upstream
import GroupRoutes from "../modules/groups/infraestructure/routes/GroupRoutes";
import PromotionRoutes from "../modules/promotions/infraestructure/routes/PromotionRoutes";
=======
import RolesRoutes from "../modules/roles/infraestructure/routes/RolesRoutes";
>>>>>>> Stashed changes

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
        this.app.use("/api", SessionRoutes);
<<<<<<< Updated upstream
        this.app.use("/api", GroupRoutes);
        this.app.use("/api", PromotionRoutes);
=======
        this.app.use("/api", RolesRoutes);
>>>>>>> Stashed changes
    }

    getApp(){
        return this.app;
    }
}

export default new App().getApp();