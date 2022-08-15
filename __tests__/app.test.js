const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
//const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

const user = {
  email: 'james@james.com',
  password: 'helloworld',
};



describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should log in user and error if email exists', async () => {
    const res = await request(app).post('/api/v1/users').send(user);
    const { email } = user;
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
