const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(require('cors')());
app.use(express.json());

app.use('/api/v1/threads', require('./controllers/threads'));
app.use('/api/v1/responses', require('./controllers/responses'));

app.use('/api/v1/recipe', require('./controllers/recipe'));
app.use('/api/v1/dessert', require('./controllers/dessert'));
app.use('/api/v1/wine', require('./controllers/wine'));
app.use('/api/v1/natgeo', require('./controllers/natGeo'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
