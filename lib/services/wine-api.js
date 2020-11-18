const fetch = require('node-fetch');
require('dotenv').config();

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

  return response;
};

module.exports = getRandomWine;
