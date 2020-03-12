import UsuarioService from "../../src/services/usuario.service";
import userMock from '../user.mock';
import truncate from '../utils/truncate';

describe("Usuario Service", () => {

     beforeEach(async () => {
        await truncate();
    }) 

    it("should store a new user", async () => {
        const usuarioService = new UsuarioService();
        userMock.password_hash = new Date().toDateString();
        await usuarioService.store(userMock).then(user => {
            expect(user.email).toBe("leandro@gmail.com");
        });

    })

})