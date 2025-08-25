import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DB_URL });

export class Games {
  static async getAll() {
    const query = `
      SELECT
        games.id,
        games.title,
        jsonb_build_object('id', publishers.id, 'name', publishers.name) AS publisher,
        jsonb_agg(jsonb_build_object('id', genres.id, 'name', genres.name)) AS genres
      FROM games
      JOIN publishers ON games.publisher_id = publishers.id
      JOIN games_genres ON games.id = games_genres.game_id
      JOIN genres ON genres.id = games_genres.genre_id
      GROUP BY games.id, games.title, publishers.id, publishers.name
      ORDER BY games.title;
    `;
    const res = await pool.query(query);
    return res.rows;
  }

  static async getOne(id) {
    const query = `
      SELECT
        games.id,
        games.title,
        jsonb_build_object('id', publishers.id, 'name', publishers.name) AS publisher,
        jsonb_agg(jsonb_build_object('id', genres.id, 'name', genres.name)) AS genres
      FROM games
      JOIN publishers ON games.publisher_id = publishers.id
      JOIN games_genres ON games.id = games_genres.game_id
      JOIN genres ON genres.id = games_genres.genre_id
      WHERE games.id = $1
      GROUP BY games.id, games.title, publishers.id, publishers.name;
    `;
    const res = await pool.query(query, [id]);
    return res.rows[0];
  }

  static async addOne({ title, publisher, genres }) {
    if (!Array.isArray(genres)) genres = [genres];
    const newGameQuery = `
      INSERT INTO games (title, publisher_id) VALUES
        ($1, $2)
      RETURNING id;
    `;
    const game = (await pool.query(newGameQuery, [title, publisher])).rows[0];
    const newRelQuery = `
      INSERT INTO games_genres (game_id, genre_id)
      SELECT $1, genre_id
      FROM unnest($2::int[]) AS genre_id;
    `;
    await pool.query(newRelQuery, [game.id, genres]);
    return game;
  }

  static async editOne({ id, title, publisher, genres }) {
    if (!Array.isArray(genres)) genres = [genres];
    const editGameQuery = `
      UPDATE games SET
        title = $1,
        publisher_id = $2
      WHERE id = $3
      RETURNING id;
    `;
    const game = (await pool.query(editGameQuery, [title, publisher, id]))
      .rows[0];
    const deleteRelQuery = `
      DELETE FROM games_genres
      WHERE game_id = $1;
    `;
    await pool.query(deleteRelQuery, [id]);
    const newRelQuery = `
      INSERT INTO games_genres (game_id, genre_id)
      SELECT $1, genre_id
      FROM unnest($2::int[]) AS genre_id;
    `;
    await pool.query(newRelQuery, [id, genres]);
    return game;
  }
}

export class Publishers {
  static async getAll() {
    const query = `
      SELECT
        publishers.id,
        publishers.name,
        COUNT(games.id) AS games
      FROM publishers
      LEFT JOIN games ON games.publisher_id = publishers.id
      GROUP BY publishers.id
      ORDER BY publishers.name;
    `;
    const res = await pool.query(query);
    return res.rows;
  }

  static async getOne(id) {
    const query = `
      SELECT
        publishers.id,
        publishers.name,
        COALESCE (
          jsonb_agg(sub.game_obj) FILTER (WHERE sub.game_obj IS NOT NULL),
          '[]'::jsonb
        ) AS games
      FROM publishers
      LEFT JOIN (
        SELECT
          games.publisher_id,
          jsonb_build_object(
            'id',     games.id,
            'title',  games.title,
            'genres', jsonb_agg(jsonb_build_object(
              'id',   genres.id,
              'name', genres.name
            ))
          ) AS game_obj
        FROM games
        JOIN games_genres ON games_genres.game_id = games.id
        JOIN genres ON genres.id = games_genres.genre_id
        GROUP BY games.id
      ) AS sub ON sub.publisher_id = publishers.id
      WHERE publishers.id = $1
      GROUP BY publishers.id;
    `;
    const res = await pool.query(query, [id]);
    return res.rows[0];
  }

  static async addOne({ name }) {
    const query = `
      INSERT INTO publishers (name) VALUES
        ($1)
      RETURNING id;
    `;
    const res = await pool.query(query, [name]);
    return res.rows[0];
  }

  static async editOne({ id, name }) {
    const query = `
      UPDATE publishers SET
        name = $1
      WHERE id = $2
      RETURNING id;
    `;
    const res = await pool.query(query, [name, id]);
    return res.rows[0];
  }
}

export class Genres {
  static async getAll() {
    const query = `
      SELECT
        genres.id,
        genres.name,
        COUNT(games.id) AS games
      FROM genres
      LEFT JOIN games_genres ON games_genres.genre_id = genres.id
      LEFT JOIN games ON games.id = games_genres.game_id
      GROUP BY genres.id
      ORDER BY genres.name;
    `;
    const res = await pool.query(query);
    return res.rows;
  }

  static async getOne(id) {
    const query = `
      SELECT
        genres.id,
        genres.name,
        COALESCE(
          jsonb_agg(jsonb_build_object(
            'id',        games.id,
            'title',     games.title,
            'publisher', jsonb_build_object(
              'id',   publishers.id,
              'name', publishers.name
            )
          )) FILTER (WHERE games.id IS NOT NULL),
          '[]'::jsonb
        ) AS games
      FROM genres
      LEFT JOIN games_genres ON games_genres.genre_id = genres.id
      LEFT JOIN games ON games.id = games_genres.game_id
      LEFT JOIN publishers ON publishers.id = games.publisher_id
      WHERE genres.id = $1
      GROUP BY genres.id;
    `;
    const res = await pool.query(query, [id]);
    return res.rows[0];
  }

  static async addOne({ name }) {
    const query = `
      INSERT INTO genres (name) VALUES
        ($1)
      RETURNING id;
    `;
    const res = await pool.query(query, [name]);
    return res.rows[0];
  }

  static async editOne({ id, name }) {
    const query = `
      UPDATE genres SET
        name = $1
      WHERE id = $2
      RETURNING id;
    `;
    const res = await pool.query(query, [name, id]);
    return res.rows[0];
  }
}
