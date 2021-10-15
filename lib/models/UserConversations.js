const pool = require('../utils/pool.js');

module.exports = class UserConversations {
  userId;
  conversationId;

  constructor(row) {
    this.userId = row.user_id;
    this.conversationId = row.conversation_id;
  }

  static async insert({ userId, conversationId }) {
    const { rows } = await pool.query(
      'INSERT INTO user_conversations (user_id, conversation_id) VALUES ($1, $2) RETURNING *',
      [userId, conversationId]
    );

    return new UserConversations(rows[0]);
  }

  static async getMessagesToCurrentUserByUserId(id) {
    const { rows } = await pool.query(
      `SELECT * FROM conversations
      WHERE to_user=$1`, [id]
    );

    return rows;
  }

  static async getUserConvosByUserId(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM conversations
      INNER JOIN user_conversations
      ON conversations.id=user_conversations.conversation_id
      INNER JOIN users
      ON user_conversations.user_id=users.id
      WHERE users.id=$1`, [id]
    );

    return rows;
  }

  static async deleteAllByUserId(id) {
    const { rows } = await pool.query(
      'DELETE FROM user_conversations WHERE user_id=$1 RETURNING *', [id]);
    
    return rows;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM user_conversations');

    return rows.map((row) => new UserConversations(row));
  }

  toJSON() {
    return {
      userId: this.userId,
      conversationId: this.conversationId,
    };
  }
};
