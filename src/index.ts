import app from "./infraestructure/web/app";
import { ServerBootStrap as ServerBootstrap } from './infraestructure/bootsrap/server.bootstrap';
import { connectDB } from "./infraestructure/config/data-base";

const serverBootstrap = new ServerBootstrap(app);
(async ()=>{
    try {
        const instances = [
            connectDB(),//conexión a la db
            serverBootstrap.initialize()//inicializacion del servidor
        ];
        await Promise.all(instances);
    } catch (error) {
        console.error("Error al inicar la aplicación", error);
        process.exit(1);
    }
})();