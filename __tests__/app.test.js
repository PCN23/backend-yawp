const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
//const { request } = require('express');
const request = require('supertest');
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
  email: 'james@james.com',
  username: 'username',
  password: 'helloworld',
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should log in user and error if email exists', async () => {
    const res = await request(app).post('/api/v1/users').send(user);
    const { email, username } = user;
    expect(res.body).toEqual({
      user: {
        id: expect.any(String),
        email,
        username,
      },
      Message: 'You are in!',
    });
  });
  afterAll(() => {
    pool.end();
  });

  it('it should sign in user and error if email and password dont match', async () => {
    await request(app).post('/api/v1/users').send(user);
    const res = await request(app).post('/api/v1/users/sessions').send({
      email: user.email,
      password: user.password,
    });

    expect(res.body).toEqual({ message: 'Signed in successfully!' });
  });
});
