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
  })
  
  .get('/:id', (req, res, next) => {
    Thread
      .findById(req.params.id)
      .then(thread => res.send(thread))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Thread
      .delete(req.params.id)
      .then(thread => res.send(thread))
      .catch(next);
  })
  
  .put('/:id', (req, res, next) => {
    Thread
      .update(req.params.id, req.body)
      .then(thread => res.send(thread))
      .catch(next);
  });
