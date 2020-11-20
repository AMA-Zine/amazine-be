const { Router } = require('express');
const Recipe = require('../models/Recipe');

module.exports = Router()
  .get('/', (req, res, next) => {
    Recipe
      .findRecipe()
      .then(recipe => res.send(recipe))
      .catch(next);
  });
