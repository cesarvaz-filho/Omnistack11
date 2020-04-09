const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    it('should be able to a new ONG', async () => {
        beforeEach(async () => {
            await connection.migrate.rollback();
            await connection.migrate.latest();
        });

        afterAll(async () => {
            await connection.destroy();
        });

        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APA",
                email: "apa@teste.com",
                whatsapp: "75911118888",
                city: "Feira de Santana",
                uf: "BA"
        });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});