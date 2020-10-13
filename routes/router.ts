import {Router, Request, Response} from 'express';
import Server from '../clases/server';

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


export default router;