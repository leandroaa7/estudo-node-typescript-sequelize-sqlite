import request from "supertest";
import app from "../../src/app";
import userMock from '../user.mock';
import truncate from '../utils/truncate';

describe("Usuario controller", () => {
    
    beforeEach(async () => {
        await truncate();
    })

    it('should create an user and receive HTTP status 200', async () => {
        const response = await request(app).
            post('/usuario')
            .send(userMock)
        console.log(response.body)
        expect(response.status).toBe(200);
    })
})
