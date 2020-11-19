const fetch = require('node-fetch');
require('dotenv').config();
const Recipe = require('../models/Recipe');

const getRecipe = async() => {
  const recipe = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.SPOON_API_KEY}`)
    .then(res => res.json())
    .then(json => json.recipes[0]);

  return await Recipe.insert({ recipe });
};

module.exports = getRecipe;
