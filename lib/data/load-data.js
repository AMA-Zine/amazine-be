const { PythonShell } = require('python-shell');
// const Thread = require('../models/Thread');
// const Response = require('../models/Response');

PythonShell.run('./iama.py', null, (err, results) => {
  if(err) throw err;
  const redditData = results.toString();
  const parsedData = JSON.parse(redditData);
  console.log(parsedData);
});
