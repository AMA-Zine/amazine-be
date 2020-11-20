const { Router } = require('express');
const Dessert = require('../models/Dessert');


module.exports = Router()
  .get('/', (req, res, next) => {
    Dessert
      .findDessert()
      .then(dessert => res.send(dessert))
      .catch(next);
  });
