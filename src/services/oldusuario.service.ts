/* import { Usuario, UsuarioInterface } from "../models/Usuario";

export default class UsuarioService {

    public index(): Promise<Usuario[]> {
        return Usuario.findAll()
            .then((usuarios: Array<Usuario>) => {
                return usuarios;
            })
            .catch((err: Error) => {
                return err;
            })
    }

    public findByid(idUsuario: string): Promise<Usuario> {
        return Usuario.findByPk(idUsuario)
            .then((result) => {
                return result;
            })
            .catch((err: Error) => {
                console.log(err);
                return err;
            })
    }

    public store(usuario: UsuarioInterface): Promise<Usuario> {
        return Usuario.create(usuario)
            .then((result) => {
                return result;
            })
            .catch((err: Error) => {
                return err;
            })
    }

    public async update(idUsuario: string, usuario: UsuarioInterface) {
        const resultFindUsuario = await this.findByid(idUsuario)
        
    }

    public delete() {

    }
} */