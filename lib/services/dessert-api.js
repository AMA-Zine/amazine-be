const fetch = require('node-fetch');
require('dotenv').config();

const getDessert = () => {
  const response = fetch(`https://api.spoonacular.com/recipes/random?number=1&tags=dessert&apiKey=${process.env.SPOON_API_KEY}`)
    .then(res => res.json())
    .then(json => {
      return json.recipes[0];
    });

  return response;
};

export default getDessert;
