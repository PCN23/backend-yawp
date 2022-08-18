const request = require('supertest');
const setup = require('../data/setup');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const UserService = require('../lib/services/UserServices');

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? user.password;
  const agent = request.agent(app);
  const newUser = await UserService.create({ ...user, ...userProps });
  const { email } = newUser;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, newUser];
};

const user = {
  username: 'username',
  email: 'james@james.com',
  password: 'helloworld',
};

describe('review routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should add a new review', async () => {
    const review = {
      stars: '5',
      detail: 'It was okay',
    };
    const [agent] = await registerAndLogin();
    const res = await agent.post('/api/v1/restaurants/1/reviews').send(review);
    expect(res.body).toEqual({
      restaurant_id: expect.any(String),
      id: expect.any(String),
      detail: expect.any(String),
      stars: expect.any(String),
    });
  });
  it('DELETE /:id/reviews should delete a review', async () => {
    const [agent] = await registerAndLogin();
    await agent.post('/api/v1/users').send({ email: 'goats@yahoo.com', password: 'password' });
    await agent.post('/api/v1/restaurants/1/reviews').send({ detail: 'delicious food', stars: '4' });
    const res = await agent.get('/api/v1/restaurants/1');
    expect(res.body.reviews.length).toEqual(2); 
    const resp = await agent.delete('/api/v1/reviews/1');
    expect(resp.status).toBe(200);
    const delResp = await agent.get('/api/v1/restaurants/1');
    expect(delResp.body.reviews.length).toBe(1);
  });
  afterAll(() => {
    pool.end();
  });
});
