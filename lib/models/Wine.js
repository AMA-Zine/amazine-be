const pool = require('../utils/pool');

module.exports = class Wine {
  id;
  wine;

  constructor(row) {
    this.id = row.id;
    this.wine = row.wine;
  }

  static async insert(wine) {
    const { rows } = await pool.query(
      'INSERT INTO wines (wine) VALUES ($1) RETURNING *',
      [wine.wine]
    );

    return new Wine(rows[0]);
  }

  static async findWine() {
    const { rows } = await pool.query(
      'SELECT * FROM wines'
    );

    return rows.map(wine => new Wine(wine));
  }
};
