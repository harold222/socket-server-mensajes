import {Router, Request, Response} from 'express';

const router = Router();

// creacion de los api endpoints

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: 'true',
        mensaje: 'todo bien'
    });

});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

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

    res.json({
        ok: 'true',
        cuerpo,
        de,
        id
    });

});


export default router;