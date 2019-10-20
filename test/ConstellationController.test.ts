import request from 'supertest';

import app from '../app';

describe('ConstellationController', () => {
  it('GET /constellations', async done => {
    await request(app)
      .get('http://localhost:8080/constellations/1')
      .expect(201, done);
  });
});
