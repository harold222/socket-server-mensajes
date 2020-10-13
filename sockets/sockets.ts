import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const user = new Usuario(cliente.id); // info del usuario por su id de socket
    usuariosConectados.agregar(user); // agrego en la lista de usuarios conectados ese user
}

interface mensajePayload {
    de: string, cuerpo: string
}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        //console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id); // borro el usuario que se desconecto de la lista de users
        
        io.emit('usuarios-activos', usuariosConectados.getLista() );
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

// funcion para configurar usuario
export const usuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', ( payload: {nombre: string}, callback: Function) => {
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista() );
        
        callback({
            ok: true,
            mensaje: `Usario ${payload.nombre} configurado`
        })
    }) 
}

export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    })
}
