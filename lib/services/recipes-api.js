const fetch = require('node-fetch');
require('dotenv').config();


const getDessert = async() => {
  const response = await fetch(`https://api.spoonacular.com/recipes/random?number=1&tags=dessert&apiKey=${process.env.SPOON_API_KEY}`) 
    .then(res => res.json())
    .then(json => {
      return json.recipes[0];
    });
    
  console.log(response);
  return response;
};

const getRecipe = async() => {
  const response = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.SPOON_API_KEY}`) 
    .then(res => res.json())
    .then(json => {
      return json.recipes[0];
    });

  console.log(response);
  return response;
};


const getRandomWine = async() => {

  const wineArray = [
    'merlot',
    'shiraz',
    'riesling',
    'champagne',
    'pinot_noir',
    'petite_sirah',
    'zinfandel',
    'rose_wine',
    'moscato',
    'bordeaux',
    'prosecco',
    'malbec'
  ];

  const randomWine = wineArray[Math.floor(Math.random() * wineArray.length)];

  const response = await fetch(`https://api.spoonacular.com/food/wine/recommendation?wine=${randomWine}&number=1&apiKey=${process.env.SPOON_API_KEY}`) 
    .then(res => res.json())
    .then(json => {
      return json.recommendedWines[0];
    });

  console.log(response);
  return response;
};

// getDessert();
// getRecipe();
// getRandomWine();
//don't forget to remove console.logs when done
