const { Router } = require('express');
const getWine = require('../services/wine-api');

module.exports = Router()
  .get('/', (req, res, next) => {
    getWine()
      .then(responses => res.send(responses))
      .catch(next);
  });
