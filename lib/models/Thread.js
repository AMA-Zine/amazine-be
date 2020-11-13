const pool = require('../utils/pool');

module.exports = class Thread {
  id;
  title;
  author;
  flair;
  upvotes;
  downvotes;
  image;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.flair = row.flair;
    this.upvotes = row.upvotes;
    this.downvotes = row.downvotes;
    this.image = row.image;
  }

  static async insert(thread) {
    const { rows } = await pool.query(
      'INSERT INTO threads (title, author, flair, upvotes, downvotes, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [thread.title, thread.author, thread.flair, thread.upvotes, thread.downvotes, thread.image]
    );

    return new Thread(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM threads',
    );

    return rows.map(thread => new Thread(thread));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM threads WHERE id=$1',
      [id]
    );

    return new Thread(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM threads WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) return null;
    return new Thread(rows[0]);
  }
};

