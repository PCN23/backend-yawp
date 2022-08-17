const { request } = require('express');
const setup = require('../data/setup');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const { Review } = require('../lib/models/Review');

describe('review routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should add a new review', async () => {
    const review = new Review({
      user_id: '1',
      restaurant_id: '1',
      detail: 'Burger was delicious',
    });
    const res = await request(app).post('/api/v1/reviews').send(review);
    expect(res.body.user_id).toEqual(review.user_id);
    expect(res.body.restaurant_id).toEqual(review.restaurant_id);
    expect(res.body.detail).toEqual(review.detail);
    const length =  Review.count(1);
    expect(length).toEqual(2);
  });
  afterAll(() => {
    pool.end();
  });
});
