const setup = require('../data/setup');
const pool = require('../lib/utils/pool');

describe('review routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should add a new review', async () => {
    const review = new Review({ });
  });
  afterAll(() => {
    pool.end();
  });
});
