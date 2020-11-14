const pool = require('../utils/pool');

module.exports = class Response {
  id;
  qAndA;
  threadId;

  constructor(row) {
    this.id = row.id;
    this.qAndA = row.q_and_a;
    this.threadId = row.thread_id;
  }

  static async insert(response) {
    const { rows } = await pool.query(
      'INSERT INTO responses (q_and_a, thread_id) VALUES ($1, $2) RETURNING *',
      [response.qAndA, response.threadId]
    );

    return new Response(rows[0]);
  }
};
