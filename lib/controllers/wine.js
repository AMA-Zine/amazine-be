const { Router } = require('express');
const Wine = require('../models/Wine');

module.exports = Router()
  .get('/', (req, res, next) => {
    Wine
      .findWine()
      .then(wine => res.send(wine))
      .catch(next);
  });
