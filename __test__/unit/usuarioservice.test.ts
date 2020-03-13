import UsuarioService from "../../src/services/usuario.service";
import userMock from '../utils/user.mock';
import truncate from '../utils/truncate';

describe("Usuario Service", () => {

    beforeEach(async () => {
        await truncate();
    })

    /** store  */
    it("should store a new user", async () => {
        const usuarioService = new UsuarioService();
        await usuarioService.store(userMock).then(user => {
            expect(userMock).toEqual({ email: user.email, password_hash: user.password_hash });
        });
    });

    /** findUserById  */
    it("should find a created user by id", async () => {
        const usuarioService = new UsuarioService();
        let usuarioStored = await usuarioService.store(userMock);
        let usuarioFindedById = await usuarioService.findUserById(usuarioStored.id.toString())

        expect(usuarioStored.dataValues).toEqual(usuarioFindedById.dataValues);
    });

    /** update
 * espera que o id do objeto atualizado seja igual ao do objeto criado
 * espera que o objeto da atualização tenha os atributos a serem atualizados 
 */
    it("should update a created user", async () => {
        const usuarioService = new UsuarioService();
        let usuarioStored = await usuarioService.store(userMock);
        let usuarioWithNewAttr = { email: "new@new.com", password_hash: "new" };
        const usuarioUpdated = await usuarioService.update(usuarioStored.id.toString(), usuarioWithNewAttr);

        expect(usuarioStored.id).toBe(usuarioUpdated["id"]);
        expect(usuarioUpdated).toHaveProperty("email", usuarioWithNewAttr.email);
        expect(usuarioUpdated).toHaveProperty("password_hash", usuarioWithNewAttr.password_hash);
    });


})