
import { Router, Request, Response } from 'express';
import { Socket } from 'socket.io';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

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

router.get('/usuarios', (req: Request, res: Response ) => {

    const server =  Server.instance;

    server.io.clients( (err: any, clientes: string[] ) => {
        if ( err ) {
            res.json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            clientes
        });
    });
});

router.get('/usuarios/detalle', (req: Request, res: Response ) => {

    res.json({
        ok  : true,
        clientes: usuariosConectados.getLista()
    })
});

export default router;