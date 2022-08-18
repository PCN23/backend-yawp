const request = require('supertest');
const setup = require('../data/setup');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const { Review } = require('../lib/models/Review');
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
    console.log(res.body);
    expect(res.body).toEqual({
      restaurant_id: expect.any(String),
      id: expect.any(String),
      detail: expect.any(String),
      stars: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
