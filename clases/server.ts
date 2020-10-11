import express from 'express';
import { SERVER_PORT } from '../global/environment'; // configuraciones globales de la aplicacion

export default class Server {

    public app: express.Application;
    public port: number;

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
    }

    start(funcion: Function) {
        this.app.listen(this.port, funcion()); 
    }

}