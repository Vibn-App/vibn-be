const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const Artist = require('../lib/models/Artist');
const app = require('../lib/app');

describe('Artist routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('Gets all artists via GET', async () => {
    const artist1 = await Artist.insert({
      id: '2SVw939fwuqSobLjF8u78b',
        artistName: 'Gogol Bordello',
        artistImage:
          'https://i.scdn.co/image/ab6761610000e5eb7c146afccb1159cb0a79acc3',
        artistUrl: 'https://open.spotify.com/artist/2SVw939fwuqSobLjF8u78b',
        artistGenre: ['gypsy', 'hardcore', 'screamo'],
      });
    
    const artist2 = await Artist.insert({
      id: '4iJLPqClelZOBCBifm8Fzv',
        artistName: 'Pierce The Veil',
        artistImage:
          'https://i.scdn.co/image/ab6761610000e5eb58c744a03131b95b9e846ff5',
        artistUrl: 'https://open.spotify.com/artist/4iJLPqClelZOBCBifm8Fzv',
        artistGenre: ['post-hardcore', 'hardcore', 'screamo'],
    })
    
    const res = await request(app).get('/api/v1/artists');

    expect(res.body).toEqual([artist1, artist2]);
  });

});
