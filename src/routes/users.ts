import { Router } from "express";

import { UsuarioController } from "../controller/usuario.controller";
const usuarioController = new UsuarioController();

const router = Router();

router.get('/', usuarioController.index);
router.post('/', usuarioController.store);
router.get('/:idusuario', usuarioController.findById);
router.put('/:idusuario', usuarioController.update);
router.delete('/:idusuario', usuarioController.destroy);

export default router;