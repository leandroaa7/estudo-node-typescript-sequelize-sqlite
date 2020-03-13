import request from "supertest";
import app from "../../src/app";
import userMock from '../utils/user.mock';
import truncate from '../utils/truncate';
import { UsuarioInterface } from "../../src/models/Usuario";
describe("Usuario controller", () => {

    beforeEach(async () => {
        await truncate();
    })

    it('should create an user and receive HTTP status 200', async () => {
        const response = await request(app).
            post('/usuario')
            .send(userMock)

        const usuario: UsuarioInterface = response.body;
        expect(response.status).toBe(200);
        expect(userMock).toEqual({ email: usuario["email"], password_hash: usuario["password_hash"] });

    })
})
