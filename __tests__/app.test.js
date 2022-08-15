const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
//const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should log in user and error if email exists', async () => {
    const res = await request
      .agent(app)
      .post('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'username',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
