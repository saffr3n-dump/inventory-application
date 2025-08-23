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
        games.title,
        jsonb_build_object('id', publishers.id, 'name', publishers.name) AS publisher,
        jsonb_agg(jsonb_build_object('id', genres.id, 'name', genres.name)) AS genres
      FROM games
      JOIN publishers ON games.publisher_id = publishers.id
      JOIN games_genres ON games.id = games_genres.game_id
      JOIN genres ON genres.id = games_genres.genre_id
      WHERE games.id = $1
      GROUP BY games.title, publishers.id, publishers.name;
    `;
    const res = await pool.query(query, [id]);
    return res.rows[0];
  }
}

export class Publishers {
  static async getAll() {
    const query = `
      SELECT
        publishers.id,
        publishers.name,
        COUNT(*) AS games
      FROM publishers
      JOIN games ON games.publisher_id = publishers.id
      GROUP BY publishers.id
      ORDER BY publishers.name;
    `;
    const res = await pool.query(query);
    return res.rows;
  }

  static async getOne(id) {
    const query = `
      SELECT
        publishers.name,
        jsonb_agg(sub.game_obj) AS games
      FROM publishers
      JOIN (
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
      GROUP BY publishers.name;
    `;
    const res = await pool.query(query, [id]);
    return res.rows[0];
  }
}

export class Genres {
  static async getAll() {
    const query = `
      SELECT
        genres.id,
        genres.name,
        COUNT(*) AS games
      FROM genres
      JOIN games_genres ON games_genres.genre_id = genres.id
      JOIN games ON games.id = games_genres.game_id
      GROUP BY genres.id
      ORDER BY genres.name;
    `;
    const res = await pool.query(query);
    return res.rows;
  }
}
