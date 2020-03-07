import { Usuario, UsuarioInterface } from "../models/Usuario";

export default class UsuarioService {

    public async index(): Promise<any> {
        return Usuario.findAll()
    }

    async findUserById(idUsuario: string): Promise<any> {
        return Usuario.findByPk(idUsuario)
    }

    async store(usuario: UsuarioInterface) {
        return Usuario.create(usuario)
    }

    public update = async (idUsuario: string, usuario: UsuarioInterface) => {
        return new Promise((resolve, reject) => {
            const resultFindUser = this.findUserById(idUsuario);

            if (resultFindUser) {
                const resultUpdateUser = Usuario.update(usuario, {
                    where: {
                        "id": idUsuario
                    }
                });

                if (resultUpdateUser) {
                    resolve(resultUpdateUser)
                } else {
                    reject("Error in update user");
                }
            } else {
                reject("User not found");
            }


        });



    }

}