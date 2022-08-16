const setup = require('../data/setup');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');




describe('restaurant routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /restaurants should return a list of restaurants', async () => {
    const resp = await request(app).get('/api/v1/restaurants');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Burger King',
        flavor: 'burger',
        city: 'Austin',
        state: 'Texas',
      },
      {
        id: '2',
        name: 'King hamich',
        flavor: 'breakfast',
        city: 'Jonestown',
        state: 'Florida',
      },
    ]);
  });
  afterAll(() => {
    pool.end();
  });
  it('#GET restaurants/:id should return a single restaurant', async () => {
    const resp = await request(app).get('/restaurants/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'King hamich',
      flavor: 'breakfast',
      city: 'Jonestown',
      state: 'Florida',
    });
  });
});
