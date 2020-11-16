const { Router } = require('express');
const Response = require('../models/Response');

module.exports = Router()
  .post('/', (req, res, next) => {
    Response
      .insert(req.body)
      .then(response => res.send(response))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Response
      .findAll()
      .then(responses => res.send(responses))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Response
      .findById(req.params.id)
      .then(response => res.send(response))
      .catch(next);
  })
  
  .put('/:id', (req, res, next) => {
    Response
      .update(req.params.id, req.body)
      .then(response => res.send(response))
      .catch(next);
  });
