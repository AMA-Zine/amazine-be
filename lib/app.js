const express = require('express');
const app = express();

app.use(require('cors')());
app.use(express.json());

app.use('/api/v1/threads', require('./controllers/threads'));
//app.use('/api/v1/responses', require('./controllers/responses'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
