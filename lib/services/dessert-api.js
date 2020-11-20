const fetch = require('node-fetch');
const Dessert = require('../models/Dessert');

const getDessert = async() => {
  const dessert = await fetch(`https://api.spoonacular.com/recipes/random?number=1&tags=dessert&apiKey=${process.env.SPOON_API_KEY}`)
    .then(res => res.json())
    .then(json => json.recipes[0]);

  return await Dessert.insert({ dessert });
};

module.exports = getDessert;
