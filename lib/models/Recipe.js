const pool = require('../utils/pool');

module.exports = class Recipe {
  id;
  recipe;

  constructor(row) {
    this.id = row.id;
    this.recipe = row.recipe;
  }

  static async insert(recipe) {
    const { rows } = await pool.query(
      'INSERT INTO recipes (recipe) VALUES ($1) RETURNING *',
      [recipe.recipe]
    );

    return new Recipe(rows[0]);
  }

  static async findRecipe() {
    const { rows } = await pool.query(
      'SELECT * FROM recipes'
    );

    return rows.map(recipe => new Recipe(recipe));
  }
};
