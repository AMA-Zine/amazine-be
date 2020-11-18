const { Router } = require('express');
const getRecipe = require('../services/recipe-api');

module.exports = Router()
  .get('/', (req, res, next) => {
    getRecipe()
      .then(responses => res.send(responses))
      .catch(next);
  });
