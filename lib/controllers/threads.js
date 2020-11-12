const { Router } = require('express');
const Thread = require('../models/Thread');

module.exports = Router()
  .post('/', (req, res, next) => {
    Thread
      .insert(req.body)
      .then(thread => res.send(thread))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Thread
      .findAll()
      .then(threads => res.send(threads))
      .catch(next);
  });
