const pool = require('../utils/pool.js');

module.exports = class UserArtists {
  userId;
  artistId;

  constructor(row) {
    this.userId = row.user_table_id;
    this.artistId = row.artist_id_table;
  }

  static async insert({ userId, artistId }) {
    const { rows } = await pool.query(
      'INSERT INTO user_artists (user_table_id, artist_id_table) VALUES ($1, $2) RETURNING *',
      [userId, artistId]
    );

    return new UserArtists(rows[0]);
  }

  static async getUserArtistsByUserId(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM artists
      INNER JOIN user_artists
      ON artists.id=user_artists.artist_id_table
      INNER JOIN users
      ON user_artists.user_table_id=users.id
      WHERE users.id=$1`, [id]
    );

    return rows.map((row) => new UserArtists(row));
  }

  static async deleteAllByUserId(id) {
    const { rows } = await pool.query(
      'DELETE FROM user_artists WHERE user_table_id=$1 RETURNING *', [id]);
    
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
