const { Router } = require('express');
const User = require('../models/User.js');
const UserArtists = require('../models/UserArtists.js');
const UserConversations = require('../models/UserConversations.js');

module.exports = Router()
  .get('/demo', async (req, res, next) => {
    try {
      const allUsers = await User.getAll();

      res.send(allUsers);
    } catch (error) {
      next(error);
    }
  })
  .get('/demo/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .get('/demo/artists', async (req, res, next) => {
    try {
      const allUserArtists = await UserArtists.getAll();
      res.send(allUserArtists);
    } catch (error) {
      next(error);
    }
  })
  .get('/demo/artists/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const allUserArtistsById = await UserArtists.getUserArtistsByUserId(id);

      res.send(allUserArtistsById);
    } catch (error) {
      next(error);
    }
  })
  .get('/demo/convos', async (req, res, next) => {
    try {
      const allUserConvos = await UserConversations.getAll();
      res.send(allUserConvos);
    } catch (error) {
      next(error);
    }
  })
  .get('/demo/convos/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const allUserConvosById = await UserConversations.getUserConvosByUserId(
        id
      );

      res.send(allUserConvosById);
    } catch (error) {
      next(error);
    }
  })
  .get('/demo/convos/to/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const allConvosToUser =
        await UserConversations.getMessagesToCurrentUserByUserId(id);

      res.send(allConvosToUser);
    } catch (error) {
      next(error);
    }
  });
