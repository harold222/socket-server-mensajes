import Server from './clases/server';
import { SERVER_PORT } from './global/environment';
import router from './routes/router';
import body from 'body-parser';
import cors from 'cors';

// instancion el server
const server = new Server();

// configuracion de body parser
server.app.use(body.urlencoded({extended: true}));
server.app.use(body.json());

// configuracion del cors domain - cualquier persona llama este servicio
server.app.use(cors({origin: true, credentials: true}));
 
// uso de las rutas
server.app.use('/', router);

// llamado de funcion para ejecutar el servidor
server.start(() => {
    console.log(`Servidor en el puerto ${SERVER_PORT}`);
});

