 const pool = require('../utils/pool.js');

module.exports = class Convo {
  id;
  toUser;
  fromUser;
  message;
  date;

  constructor(row) {
    this.id = row.id;
    this.toUser = row.to_user;
    this.fromUser = row.from_user;
    this.message = row.message;
    this.date = row.date;
  }

  static async insert({ toUser, fromUser, message, date }) {
    const { rows } = await pool.query(
      'INSERT INTO conversations (to_user, from_user, message, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [toUser, fromUser, message, date]
    );

    return new Convo(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM conversations WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Convo(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM conversations');

    return rows.map((row) => new Convo(row));
  }

  toJSON() {
    return {
      id: this.id,
      toUser: this.toUser,
      fromUser: this.fromUser,
      message: this.message,
      date: this.date,
    };
  }
};
