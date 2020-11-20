const pool = require('../utils/pool');

module.exports = class Dessert {
  id;
  dessert;

  constructor(row) {
    this.id = row.id;
    this.dessert = row.dessert;
  }

  static async insert(dessert) {
    const { rows } = await pool.query(
      'INSERT INTO desserts (dessert) VALUES ($1) RETURNING *',
      [dessert.dessert]
    );

    return new Dessert(rows[0]);
  }

  static async findDessert() {
    const { rows } = await pool.query(
      'SELECT * FROM desserts'
    );

    return rows.map(dessert => new Dessert(dessert));
  }
};
