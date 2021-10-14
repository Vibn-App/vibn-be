const pool = require('../utils/pool.js');

module.exports = class Artist {
  id;
  artistName;
  artistImage;
  artistLink;
  artistGenre;

  constructor(row) {
    this.id = row.id;
    this.artistName = row.artist_name;
    this.artistImage = row.artist_image;
    this.artistLink = row.artist_link;
    this.artistGenre = row.artist_genre;
  }

  static async insert({ artistName, artistImage, artistLink, artistGenre }) {
    const { rows } = await pool.query(
      'INSERT INTO artists (artist_name, artist_image, artist_link, artist_genre) VALUES ($1, $2, $3, $4) RETURNING *',
      [artistName, artistImage, artistLink, artistGenre]
    );

    return new Artist(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM artists WHERE id=$1', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Artist(rows[0]);
  }

  static async findArtistsByUserId(id) {
    const { rows } = await pool.query(
      `SELECT * FROM users
      LEFT JOIN user_artists
      ON users.id=user_artists.user_id
      LEFT JOIN artists
      ON user_artists.artist_id=artists.id
      WHERE id=$1`,
      [id]
    );

    if (!rows[0]) return null;
    return new Artist(rows[0]);
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
      artistLink: this.artistLink,
      artistGenre: this.artistGenre,
    };
  }
};
