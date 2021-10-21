const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
// const request = require('supertest');
// const app = require('../lib/app.js');

describe('vibn-be routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // Maybe do something important?
  it('does nothing important yet', async () => {
    const res = 'hi';

    expect(res).toEqual('hi');
  });
});
