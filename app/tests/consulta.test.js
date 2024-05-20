const request = require('supertest')
const app = require('../index')

describe('Consulta API', () => {
  it('should return all consultations', async () => {
    const response = await request(app).get('/consultas');

    expect(response.status).toBe(200);
    expect(response.body.consultas).toHaveLength(2); // ? 
  });
});
