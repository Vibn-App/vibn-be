const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const User = require('../lib/models/User');
const app = require('../lib/app');

describe('User routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('Gets a user by ID via GET', async () => {
      const user = await User.insert({
        displayName: 'Sbeve',
        email: 'sbeve@busey.co',
        profileURL: 'http://spotify.com',
        image:
          'https://upload.wikimedia.org/wikipedia/en/8/8b/ST3_Steve_Harrington_portrait.jpg',
      });

      const res = await request(app).get(`/api/v1/users/${user.id}`);

      expect(res.body).toEqual(user);
  });
    it('Gets all users via GET', async () => {
        const sbeve = await User.insert({
          displayName: 'Sbeve',
          email: 'sbeve@busey.co',
          profileURL: 'http://spotify.com',
          image:
            'https://upload.wikimedia.org/wikipedia/en/8/8b/ST3_Steve_Harrington_portrait.jpg',
        });
        const busey = await User.insert({
          displayName: 'Gary Busey',
          email: 'gary@busey.co',
          profileURL: 'http://spotify.com',
          image:
            'https://images.mubicdn.net/images/cast_member/2321/cache-463-1602494874/image-w856.jpg',
        });
        const res = await request(app).get('/api/v1/users');

        expect(res.body).toEqual([sbeve, busey]);
    })
});
