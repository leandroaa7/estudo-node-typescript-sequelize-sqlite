import UsuarioService from "../../src/services/usuario.service";
import userMock from '../utils/user.mock';
import truncate from '../utils/truncate';

describe("Usuario Service", () => {

    beforeEach(async () => {
        await truncate();
    })

    it("should store a new user", async () => {
        const usuarioService = new UsuarioService();
        userMock.password_hash = new Date().toDateString();
        await usuarioService.store(userMock).then(user => {
            expect(userMock).toEqual({ email: user.email, password_hash: user.password_hash });
        });

    })

})