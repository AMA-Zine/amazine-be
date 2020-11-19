const pool = require('./pool');
const fs = require('fs');

const reformatData = () => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
};

module.exports = reformatData;
