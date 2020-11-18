const fetch = require('node-fetch');
require('dotenv').config();

const getRecipe = async() => {
  const response = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.SPOON_API_KEY}`)
    .then(res => res.json())
    .then(json => {
      return json.recipes[0];
    });

  return response;
};

module.exports = getRecipe;
