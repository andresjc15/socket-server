
import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();


router.post('/mensajes', ( req: Request, res: Response ) => {
    const body = req.body.body;
    const de = req.body.de;

    const payload = {
        body,
        de
    }

    const server = Server.instance;
    server.io.emit( 'mensaje-nuevo', payload )

    res.json({
        ok: true,
        body,
        de
    })
});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {

    const body = req.body.body;
    const de = req.body.de;
    const id    =req.params.id;

    const payload = {
        de,
        body
    }

    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload )

    res.json({
        ok: true,
        body,
        de
    })
});

export default router;