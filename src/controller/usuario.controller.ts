import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import UsuarioService from "../services/usuario.service";

export class UsuarioController {

    private usuarioService = new UsuarioService();

    public index = async (req: Request, res: Response) => {
        this.usuarioService.index()
            .then((usuarios: Array<Usuario>) => {
                res.status(200).json(usuarios);
            })
            .catch((err: Error) => {
                res.status(500).json(err);
            })
    }

    public findById = async (req: Request, res: Response) => {
        const idUsuario = req.params.idusuario;
        const result = await this.usuarioService.findUserById(idUsuario)
        res.json(result);
    }

    public destroy = async (req: Request, res: Response) => {
        const idUsuario = req.params.idusuario;
        this.usuarioService.destroy(idUsuario)
            .then((user) => {
                res.status(200).json(user);
            }).catch((err: Error) => {
                res.status(500).json(err);
            });
    }

    public store = async (req: Request, res: Response) => {
        let usuario = {
            email: req.body.email,
            password_hash: req.body.password_hash
        }
        this.usuarioService.store(usuario)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => {

                res.status(500).json(err);
            });
    }

    public update = async (req: Request, res: Response) => {

        const idUsuario = req.params.idusuario;
        const usuario = req.body;
        return this.usuarioService.update(idUsuario, usuario)
            .then((resultUpdateUser) => {
                res.status(200).json(resultUpdateUser)
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

}