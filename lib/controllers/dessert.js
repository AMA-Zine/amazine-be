const { Router } = require('express');
const getDessert = require('../services/dessert-api');

module.exports = Router()
  .get('/', (req, res, next) => {
    getDessert()
      .then(responses => res.send(responses))
      .catch(next);
  });
