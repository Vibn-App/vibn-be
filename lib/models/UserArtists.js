const pool = require('../utils/pool.js');

module.exports = class UserArtists {
  userId;
  artistId;

  constructor(row) {
    this.userId = row.user_id;
    this.artistid = row.artist_id;
  }

  static async insert({ userId, artistId }) {
    const { rows } = await pool.query(
      'INSERT INTO user_artists (user_id, artist_id) VALUES ($1, $2) RETURNING *',
      [userId, artistId]
    );

    return new UserArtists(rows[0]);
  }

  static async deleteAllByUserId(id) {
    const { rows } = await pool.query(
      'DELETE FROM user_artists WHERE user_id=$1 RETURNING *', [id]);
    
    return rows;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM user_artists');

    return rows.map((row) => new UserArtists(row));
  }

  toJSON() {
    return {
      userId: this.userId,
      artistId: this.artistId,
    };
  }
};
