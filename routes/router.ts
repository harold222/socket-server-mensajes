import {Router, Request, Response} from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

// creacion de los api endpoints

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: 'true',
        mensaje: 'mensaje'
    });

});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance; // MISMA INSTANCIA
    server.io.emit('nuevo-mensaje', payload); // permite la comunicacion en un id en especifico


    res.json({
        ok: 'true',
        cuerpo,
        de
    });

});

// mensaje con argumento o id
router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance; // MISMA INSTANCIA
    server.io.in(id).emit('mensaje-privado', payload); // permite la comunicacion en un id en especifico

    res.json({
        ok: 'true',
        cuerpo,
        de,
        id
    });

});

// servicio para obtener todos los ID's de los usuarios conectados
router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;

    server.io.clients((err: any, clientes: string[]) => { // funcion de socket para pasar todos los ids
        if(err) {
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: 'true',
            clientes
        });
    });
});

// servicio para obtener los usuarios con sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {
    res.json({
        ok: 'true',
        clientes: usuariosConectados.getLista()
    });
});

export default router;