const { Router } = require('express');
const getNatGeo = require('../services/natGeo-api');

module.exports = Router()
  .get('/', (req, res, next) => {
    getNatGeo()
      .then(responses => res.send(responses))
      .catch(next);
  });
