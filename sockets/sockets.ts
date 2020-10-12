import { Socket } from 'socket.io';
import socketIO from 'socket.io';

interface mensajePayload {
    de: string, cuerpo: string
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    })
}

// funcion al recibir un mensaje que envia un cliente
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', ( payload: mensajePayload) => {
        console.log(`de: ${payload.de} y mensaje = ${payload.cuerpo}`);

        // emito a los demas clientes este mensaje
        io.emit('nuevo-mensaje', payload); 
    })
}




