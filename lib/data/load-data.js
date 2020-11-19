const { PythonShell } = require('python-shell');
const fetch = require('node-fetch');
const getPhotosArray = require('../services/photo-api');
const reformatData = require('../utils/delete-data');

reformatData();

const options = {
  mode: 'json'
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
        return fetch('http://localhost:7890/api/v1/threads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            title: thread.title,
            flair: thread.flair,
            image: img
          })
        });
      })
      .then(res => res.json());
  })
  );

  await Promise.all(data.map((response, i) => {
    fetch('http://localhost:7890/api/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        qAndA: response.qAndA,
        threadId: threads[i].id
      })
    });
  }));
};
