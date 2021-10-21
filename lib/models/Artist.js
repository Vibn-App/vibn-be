const pool = require('../utils/pool.js');

module.exports = class Artist {
  id;
  artistName;
  artistImage
  artistUrl;
  artistGenre;

  constructor(row) {
    this.id = row.id;
    this.artistName = row.artist_name;
    this.artistImage = row.artist_image;
    this.artistUrl = row.artist_url;
    this.artistGenre = row.artist_genre;
  }

  static async insert({ id, artistName, artistImage, artistUrl, artistGenre }) {
    const { rows } = await pool.query(
      'INSERT INTO artists (id, artist_name, artist_image, artist_url, artist_genre) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [id, artistName, artistImage, artistUrl, artistGenre]
    );

    return new Artist(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM artists WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Artist(rows[0]);
  }

  static async findArtistsByUserId(id) {
    // You may want to use an INNER JOIN here instead, otherwise
    // you'll be getting null rows back for users that don't have any artists
    const { rows } = await pool.query(
      `SELECT * FROM users
      LEFT JOIN user_artists
      ON users.id=user_id
      LEFT JOIN artists
      ON artist_id=artists.id
      WHERE users.id=$1`,
      [id]
    );

    if (!rows[0]) return null;
    return rows.map((row) => new Artist(row));
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM artists');

    return rows.map((row) => new Artist(row));
  }

  toJSON() {
    return {
      id: this.id,
      artistName: this.artistName,
      artistImage: this.artistImage,
      artistUrl: this.artistUrl,
      artistGenre: this.artistGenre,
    };
  }
};
