import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Testing Zipcode", () => {
    let token: string;

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("[200] - Should be able to check the database connection", async () => {
        const response = await request(app).get("/zipcode/health/ping")
        expect(response.status).toBe(200);
    });

    it("[200] - Should be able to create a new token", async () => {
        const response = await request(app).post("/zipcode/token")
        expect(response.status).toBe(200);
        token = response.body.token;
    });

    it("[401] - Unauthorized when create a new zipcode", async () => {
        const response = await request(app).post("/zipcode")
            .set('Authorization', '')
            .send({
                cep: "14403224",
                rua: "RUA TESTE",
                bairro: "BAIRRO TESTE",
                cidade: "CIDADE TESTE",
                uf: "UF TESTE"
            });
        expect(response.status).toBe(401);
    });

    it("[201] - Should be able to create a new zipcode", async () => {
        const response = await request(app).post("/zipcode")
            .set('Authorization', `Bearer ${token}`)
            .send({
                cep: "14403224",
                rua: "RUA TESTE",
                bairro: "BAIRRO TESTE",
                cidade: "CIDADE TESTE",
                uf: "UF TESTE"
            });
        expect(response.status).toBe(201);
    });

    it("[400] - [CEP] is missing when create a new zipcode", async () => {
        const response = await request(app).post("/zipcode")
            .set('Authorization', `Bearer ${token}`)
            .send({
                rua: "RUA TESTE",
                bairro: "BAIRRO TESTE",
                cidade: "CIDADE TESTE",
                uf: "UF TESTE"
            });
        expect(response.status).toBe(400);
    });

    it("[400] - Invalid cep", async () => {
        const response = await request(app).post("/zipcode")
            .set('Authorization', `Bearer ${token}`)
            .send({
                cep: "14403001",
                rua: "RUA TESTE",
                bairro: "BAIRRO TESTE",
                cidade: "CIDADE TESTE",
                uf: "UF TESTE"
            });
        expect(response.status).toBe(400);
    });

    it("[200] - Should be able to search a zipcode", async () => {
        const response = await request(app).get("/zipcode/14403224")
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });

    it("[400] - Zipcode not found in search", async () => {
        const response = await request(app).get("/zipcode/11111111")
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(400);
    });

    it("[404] - Without parameter in the GET method", async () => {
        const response = await request(app).get("/zipcode/")
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(404);
    });
});