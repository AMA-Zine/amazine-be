const { PythonShell } = require('python-shell');
const fetch = require('node-fetch');
const getPhotosArray = require('../services/photo-api');
const getRandomReporter = require('../services/reporters');
const getRecipe = require('../services/recipe-api');
const getRandomWine = require('../services/wine-api');
const getDessert = require('../services/dessert-api');
const reformatData = require('../utils/delete-data');

const clientId = process.env.REDDIT_ID;
const clientSecret = process.env.REDDIT_SECRET;
const userAgent = process.env.REDDIT_AGENT;
const username = process.env.REDDIT_USERNAME;
const password = process.env.REDDIT_PASSWORD;

const URL = process.env.URL;

reformatData();

getRecipe();
getRandomWine();
getDessert();

const options = {
  mode: 'json',
  args: [clientId, clientSecret, userAgent, username, password]
};

PythonShell.run(`${__dirname}/iama.py`, options, (err, results) => {
  if(err) throw err;
  const iAmAResults = results[0];
  insertData(iAmAResults);
});

const insertData = async(data) => {
  const threads =  await Promise.all(data.map(thread => {
    return getPhotosArray(thread.flair)
      .then(img => {
        return fetch(`${URL}/api/v1/threads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            title: thread.title,
            author: getRandomReporter(),
            flair: thread.flair,
            image: img
          })
        });
      })
      .then(res => res.json());
  })
  );

  await Promise.all(data.map((response, i) => {
    fetch(`${URL}/api/v1/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        qAndA: response.qAndA,
        threadId: threads[i].id
      })
    });
  }));
};
