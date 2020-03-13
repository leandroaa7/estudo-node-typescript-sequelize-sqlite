import { Usuario, UsuarioInterface } from "../models/Usuario";
import { UpdateOptions } from "sequelize";
export default class UsuarioService {

    public async index(): Promise<Usuario[]> {
        return Usuario.findAll()
    }

    public async findUserById(idUsuario: string): Promise<Usuario | null> {
        return Usuario.findByPk(idUsuario)
    }

    public async store(usuario: UsuarioInterface) {
        return Usuario.create(usuario)
    }

    public update = async (idUsuario: string, usuario: UsuarioInterface): Promise<Usuario | Error> => {
        let usuarioFindedById: Usuario | null,
            queryCondition: UpdateOptions,
            isUpdated: Object | any;

        usuarioFindedById = await this.findUserById(idUsuario);

        if (usuarioFindedById) {
            queryCondition = { where: { "id": idUsuario } };
            isUpdated = await Usuario.update(usuario, queryCondition);

            // verifica se conseguiu atualizar
            if (isUpdated["0"] == 1) {
                //atualiza model 
                await usuarioFindedById.reload();
                return usuarioFindedById;
            } else {
                return new Error("User not updated");
            }
        } else {
            return new Error("User not found");
        }
    }

}