const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Convo = require('../models/Convo');
const UserConversations = require('../models/UserConversations');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allConvos = await Convo.getAll();

      res.send(allConvos);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const convo = await Convo.findById(id);

      res.send(convo);
    } catch (error) {
      next(error);
    }
  })
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      // This could all be moved to a Service
      let convo = await Convo.findById(req.body.id);
      if(!convo) {
        convo = await Convo.insert(req.body.sentConvo);
      }
      await UserConversations.insert({ userId: req.user.id, conversationId: convo.id });
      res.send(convo);
    } catch (error) {
      next(error);
    }
  });
