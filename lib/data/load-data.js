const { PythonShell } = require('python-shell');
const fetch = require('node-fetch');


const options = {
  mode: 'json'
};

PythonShell.run('./iama.py', options, (err, results) => {
  if(err) throw err;
  const iAmAResults = results[0];
  insertData(iAmAResults);
});

const insertData = async(data) => {
  const threads =  await Promise.all(data.map(thread => {
    return fetch('http://localhost:7890/api/v1/threads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        title: thread.title,
        flair: thread.flair
      })
    })
      .then(res => res.json());
  })
  );

  await Promise.all(data.map(response => {
    for(let i = 0; i < threads.length; i++) {
      fetch('http://localhost:7890/api/v1/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          qAndA: response.qAndA,
          threadId: threads[i].id
        })
      });
    }
  }));
};
