import { Usuario, UsuarioInterface } from "../models/Usuario";
import { UpdateOptions } from "sequelize";

class UsuarioServiceError extends Error {
    constructor(name: string, message: string, stack?: string) {
        super(message);
        this.name = name;
        stack ? this.stack : false;
    }
}

export default class UsuarioService {

    public async index(): Promise<Usuario[]> {
        return Usuario.findAll()
    }

    public async findUserById(idUsuario: string): Promise<Usuario> {
        return Usuario.findByPk<Usuario>(idUsuario)
    }

    public async store(usuario: UsuarioInterface): Promise<Usuario> {
        return Usuario.create(usuario)
            .then(newUser => {
                return newUser;
            })
            .catch(err => {
                if (err.name == "SequelizeUniqueConstraintError") {
                    return Promise.reject(new UsuarioServiceError("store error", "user with this email have been created", err))
                } else {
                    return Promise.reject(new UsuarioServiceError("store error", "check stack error", err))
                }
            })
    }

    public update = async (idUsuario: string, usuario: UsuarioInterface): Promise<any> => {
        let usuarioFindedById: Usuario,
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

                return Promise.reject(new UsuarioServiceError("Update Error", "user not updated"));
            }
        } else {
            return Promise.reject(new UsuarioServiceError("Update Error", "user not found"));
        }


    }

    public destroy = async (idUsuario: string) => {
        let usuarioFindedById: Usuario;
        let rowsDeleted: number;
        let queryCondition: Object;

        usuarioFindedById = await this.findUserById(idUsuario);

        if (usuarioFindedById) {
            queryCondition = {
                where: { id: idUsuario }
            };
            rowsDeleted = await Usuario.destroy(queryCondition);
            if (rowsDeleted == 1) {
                return usuarioFindedById;
            } else {
                return Promise.reject(new UsuarioServiceError("Destroy Error", "user not destroyed"));
            }
        } else {
            return Promise.reject(new UsuarioServiceError("Destroy Error", "user not found"));
        }
    }

}