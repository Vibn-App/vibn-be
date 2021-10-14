const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Artist = require('../models/Artist');
const UserArtists = require('../models/UserArtists');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allUsers = await Artist.getAll();

      res.send(allUsers);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await Artist.findById(id);

      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  // .get('/:id/topart', async (req, res, next) => {
  //   try {
  //     const id = req.params.id;
  //     const topArtists = await Artist.findArtistsByUserId(id);

  //     res.send(topArtists);
  //   } catch (error) {
  //     next(error);
  //   }
  // })
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      console.log(req);
      await UserArtists.deleteAllByUserId(req.user.id);
      const artists = await Promise.all(req.body?.artistsArray?.map(async (artistObj) => {
        let artist = await Artist.findById(artistObj.id);
        if (!artist) {
          artist = await Artist.insert({
            id: artistObj.id,
            artistName: artistObj.name,
            artistImage: artistObj.images[1].url,
            artistUrl: artistObj.external_urls.spotify,
            artistGenre: artistObj.genres[0]
          });
        }
        console.log(artistObj.id);
        await UserArtists.insert({ userId: req.user.id, artistId: artistObj.id });
        return artist;
      }));

      res.send(artists);
    } catch (error) {
      next(error);
    }
  });
