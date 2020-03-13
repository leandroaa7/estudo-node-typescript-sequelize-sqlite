import UsuarioService from "../../src/services/usuario.service";
import userMock from '../utils/user.mock';
import truncate from '../utils/truncate';

describe("Usuario Service", () => {

    beforeEach(async () => {
        await truncate();
    })

    it("should store a new user", async () => {
        const usuarioService = new UsuarioService();
        await usuarioService.store(userMock).then(user => {
            expect(userMock).toEqual({ email: user.email, password_hash: user.password_hash });
        });
    });

    it("should find a created user by id", async () => {
        const usuarioService = new UsuarioService();
        let usuarioStored = await usuarioService.store(userMock);
        let usuarioFindedById = await usuarioService.findUserById(usuarioStored.id.toString())

        expect(usuarioStored.dataValues).toEqual(usuarioFindedById.dataValues);
    });

    it("should update a created user", async () => {
/*         const usuarioService = new UsuarioService();
        let usuarioStored = await usuarioService.store(userMock);

        let newPasswordHash = "newPass";

        let usuarioUpdated = await usuarioService.update(usuarioStored.id,) */
        //expect(usuarioStored.)
    })


})