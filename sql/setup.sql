DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS user_artists CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS user_conversations CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  spotify_username TEXT NOT NULL,
  spotify_email TEXT NOT NULL,
  spotify_profile TEXT,
  spotify_image TEXT
);

CREATE TABLE artists (
  id TEXT PRIMARY KEY,
  artist_name TEXT NOT NULL,
  artist_image TEXT NOT NULL,
  artist_url TEXT NOT NULL,
  artist_genre TEXT NOT NULL
);

CREATE TABLE user_artists (
  user_table_id BIGINT NOT NULL REFERENCES users(id),
  artist_id_table TEXT NOT NULL REFERENCES artists(id)
);

CREATE TABLE conversations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  to_user TEXT NOT NULL,
  from_user TEXT NOT NULL,
  message TEXT,
  date TEXT
);

CREATE TABLE user_conversations (
  user_id BIGINT NOT NULL REFERENCES users(id),
  conversation_id BIGINT NOT NULL REFERENCES conversations(id)
);
