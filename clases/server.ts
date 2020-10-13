import express from 'express';
import { SERVER_PORT } from '../global/environment'; // configuraciones globales de la aplicacion
// uso de libreria socket io
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server; // propiedad de la clase en general
    public app: express.Application;
    public port: number;

    // conexion de los sockets, se encargara de los eventos de los sockets
    public io: socketIO.Server;
    // servira de intermediario entre el server express y socket
    private httpServer: http.Server;

    // patron sigleton para no crear mas de una instancio del socket
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance() { // si ya existe una instancia de la clase la retorna, sino crea una nueva
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log(`Escuchando sockets`);

        // on = para escuchar algun evento emitido al conectarse un cliente
        this.io.on('connection', cliente => {
            //console.log('Cliente conectado');

            // para conectar al cliente
            socket.conectarCliente(cliente);

            // para configurar los usuarios
            socket.usuario(cliente, this.io);

            // mensajes recibidos
            socket.mensaje(cliente, this.io);

            // si el usuario una vez de conectado se desconecta, llamando la funcion de la otra clase 
            socket.desconectar(cliente);

        });
    }

    start(funcion: Function) {
        this.httpServer.listen(this.port, funcion()); 
    }

} 