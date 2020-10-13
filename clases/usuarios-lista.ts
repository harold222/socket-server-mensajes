import { usuario } from "../sockets/sockets";
import { Usuario } from "./usuario";

export class UsuariosLista{

    private lista: Usuario[] = [];

    constructor() {
    }

    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id: string, nombre: string) {
        for (const user of this.lista) {
            if(user.id === id) {
                user.nombre = nombre;
                break;
            }
        }

        console.log('Actualizado el usuario');
    }

    public getLista() {
        return this.lista;
    }

    public getUsuario(id: string) { // retorno el usuario que posea el mismo id
        return this.lista.find(usuario => usuario.id === id);
    }

    public getUsuariosSala(salaNombre: string) { // para obtener todos los usuarios en esa sala en particular
        return this.lista.filter(usuario => usuario.sala === salaNombre);
    }

    public borrarUsuario(id: string) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id); // regreso todos los diferentes a ese id
        return tempUser;
    }
}



