import UsuarioService from "../../src/services/usuario.service";

describe("Usuario Service", () => {

    it("should store a new user", async () => {
        const usuarioService = new UsuarioService();
        await usuarioService.store({
            "email": "leandro@gmail.com",
            "password_hash": "2344"
        }).then(user => {
            expect(user.email).toBe("leandro@gmail.com");
        });

    })

})