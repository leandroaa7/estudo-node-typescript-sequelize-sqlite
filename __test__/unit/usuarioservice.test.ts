import UsuarioService from "../../src/services/usuario.service";
import userMock from '../utils/user.mock';
import truncate from '../utils/truncate';

describe("Usuario Service", () => {

    beforeEach(async () => {
        await truncate();
    })

    /** index  */
    it("should list users created", async () => {
        const usuarioService = new UsuarioService();
        const usuarioList = await Promise.all([usuarioService.store(userMock[0]), usuarioService.store(userMock[1])]);

        expect(userMock).toHaveLength(usuarioList.length);
    });

    /** findUserById  */
    it("should find a created user by id", async () => {
        const usuarioService = new UsuarioService();
        let usuarioStored = await usuarioService.store(userMock[0]);
        let usuarioFindedById = await usuarioService.findUserById(usuarioStored.id.toString())

        expect(usuarioStored.dataValues).toEqual(usuarioFindedById.dataValues);
    });

    /** store  */
    it("should store a new user", async () => {
        const usuarioService = new UsuarioService();
        await usuarioService.store(userMock[0]).then(user => {
            expect(userMock[0]).toEqual({ email: user.email, password_hash: user.password_hash });
        });
    });

    /** update
 * espera que o id do objeto atualizado seja igual ao do objeto criado
 * espera que o objeto da atualização tenha os atributos a serem atualizados 
 */
    it("should update a created user", async () => {
        const usuarioService = new UsuarioService();
        let usuarioStored = await usuarioService.store(userMock[0]);
        let usuarioWithNewAttr = { email: "new@new.com", password_hash: "new" };
        const usuarioUpdated = await usuarioService.update(usuarioStored.id.toString(), usuarioWithNewAttr);

        expect(usuarioStored.id).toBe(usuarioUpdated["id"]);
        expect(usuarioUpdated).toHaveProperty("email", usuarioWithNewAttr.email);
        expect(usuarioUpdated).toHaveProperty("password_hash", usuarioWithNewAttr.password_hash);
    });


})