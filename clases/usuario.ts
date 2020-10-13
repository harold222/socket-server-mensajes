export class Usuario {

    public id: string; // id del socket que se conectara
    public nombre: string;
    public sala: string; // las salas de chat que se tendran

    constructor(id: string) {
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'general';
    }

}