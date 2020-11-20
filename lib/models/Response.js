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

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM responses',
    );

    return rows.map(response => new Response(response));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM responses WHERE thread_id=$1',
      [id]
    );

    if(!rows[0]) return null;
    return new Response(rows[0]);
  }

  static async update(id, updatedResponse) {
    const { rows } = await pool.query(
      `UPDATE responses
        SET q_and_a=$1,
            thread_id=$2
        WHERE id=$3
        RETURNING *
      `,
      [updatedResponse.qAndA, updatedResponse.threadId, id]
    );

    if(!rows[0]) return null;
    return new Response(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM responses WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) return null;
    return new Response(rows[0]);
  }
};
