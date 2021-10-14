const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const User = require('../lib/models/User');
const app = require('../lib/app');
const Convo = require('../lib/models/Convo');

describe('Conversation routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('Gets a convo by ID via GET', async () => {
    const reciever = await User.insert({
      displayName: 'Sbeve',
      email: 'sbeve@busey.co',
      profileURL: 'http://spotify.com',
      image:
        'https://upload.wikimedia.org/wikipedia/en/8/8b/ST3_Steve_Harrington_portrait.jpg',
    });

    const sender = await User.insert({
      displayName: 'Gary Busey',
      email: 'gary@busey.co',
      profileURL: 'http://spotify.com',
      image:
        'https://images.mubicdn.net/images/cast_member/2321/cache-463-1602494874/image-w856.jpg',
    });

    const dMessage = await Convo.insert({
      toUser: reciever.displayName,
      fromUser: sender.displayName,
      message: 'henlo uwu',
      date: '10-13-2021',
    });

    const res = await request(app).get(`/api/v1/user/convos/${dMessage.id}`);

    expect(res.body).toEqual(dMessage);
  });

  it('Lists all messages via GET', async () => {
    const sender = await User.insert({
      displayName: 'Steve Buscemi',
      email: 'buscemi@busey.co',
      profileURL: 'http://spotify.com',
      image:
        'https://bloximages.newyork1.vip.townnews.com/tulsaworld.com/content/tncms/assets/v3/editorial/5/be/5be3da86-8634-5334-9388-44ab59f88c1d/5c1d63798ff3e.image.jpg?crop=1660%2C1245%2C1%2C0&resize=1660%2C1245&order=crop%2Cresize',
    });
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
    const message1 = await Convo.insert({
      toUser: sbeve.displayName,
      fromUser: sender.id,
      message: 'henlo owo',
    });
    const message2 = await Convo.insert({
      toUser: busey.displayName,
      fromUser: sender.id,
      message: 'UWUOWO',
    });

    

    const messageArr = [
      message1,
      message2
    ];

    const res = await request(app).get('/api/v1/user/convos');

    expect(res.body).toEqual(messageArr);
  });
});
