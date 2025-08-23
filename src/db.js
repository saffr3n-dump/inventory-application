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
