import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe("Surveys", async() => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Tatakae",
            description: "Tatakae Tatakae"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async() => {
        await request(app).post("/surveys").send({
            title: "Tatakae2",
            description: "Tatakae2 Tatakae2",
        });

        const response = await request(app).get("/surveys");
        expect(response.body.length).toBe(2);
    })
});

