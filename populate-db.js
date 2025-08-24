import { Client } from 'pg';

const QUERY = `
  CREATE TABLE IF NOT EXISTS publishers (
    id   INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS games (
    id           INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title        VARCHAR(255) NOT NULL,
    publisher_id INTEGER REFERENCES publishers(id) ON DELETE RESTRICT
  );

  CREATE TABLE IF NOT EXISTS genres (
    id   INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS games_genres (
    game_id  INTEGER REFERENCES games(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE RESTRICT,
    PRIMARY KEY (game_id, genre_id)
  );
  CREATE INDEX IF NOT EXISTS idx_games_genres_genre_id ON games_genres(genre_id);

  INSERT INTO publishers (name) VALUES
    ('Bandai Namco Entertainment'),
    ('CD Projekt'),
    ('Rockstar Games'),
    ('Sony Computer Entertainment'),
    ('Square Enix');

  INSERT INTO games (title, publisher_id) VALUES
    ('Dark Souls III',           1),
    ('Elden Ring',               1),
    ('Tekken 7',                 1),
    ('Tekken 8',                 1),
    ('Cyberpunk 2077',           2),
    ('The Witcher 3: Wild Hunt', 2),
    ('Grand Theft Auto V',       3),
    ('Red Dead Redemption 2',    3),
    ('Manhunt',                  3),
    ('Max Payne 3',              3),
    ('Bloodborne',               4),
    ('The Last of Us',           4),
    ('The Last of Us Part II',   4),
    ('Shadow of the Colossus',   4),
    ('LittleBigPlanet 3',        4),
    ('Final Fantasy XV',         5),
    ('Final Fantasy VII Remake', 5),
    ('Kingdom Hearts III',       5),
    ('Nier: Automata',           5),
    ('Dragon Quest XI',          5);

  INSERT INTO genres (name) VALUES
    ('Action RPG'),
    ('Fighting'),
    ('Open World'),
    ('JRPG'),
    ('Shooter'),
    ('Stealth'),
    ('Hack and Slash'),
    ('Platformer');

  INSERT INTO games_genres (game_id, genre_id) VALUES
    (1, 1),           -- Dark Souls III → Action RPG
    (2, 1), (2, 3),   -- Elden Ring → Action RPG / Open World
    (3, 2),           -- Tekken 7 → Fighting
    (4, 2),           -- Tekken 8 → Fighting
    (5, 5), (5, 3),   -- Cyberpunk 2077 → Shooter / Open World
    (6, 1), (6, 3),   -- Witcher 3 → Action RPG / Open World
    (7, 5), (7, 3),   -- GTA V → Shooter / Open World
    (8, 6), (8, 3),   -- RDR2 → Stealth / Open World
    (9, 6),           -- Manhunt → Stealth
    (10, 5),          -- Max Payne 3 → Shooter
    (11, 1),          -- Bloodborne → Action RPG
    (12, 1), (12, 6), -- The Last of Us → Action RPG / Stealth
    (13, 1), (13, 6), -- The Last of Us II → Action RPG / Stealth
    (14, 7),          -- Shadow of the Colossus → Hack and Slash
    (15, 8),          -- LittleBigPlanet 3 → Platformer
    (16, 4),          -- FF XV → JRPG
    (17, 4),          -- FF VII Remake → JRPG
    (18, 4),          -- Kingdom Hearts III → JRPG
    (19, 1), (19, 7), -- Nier Automata → Action RPG / Hack and Slash
    (20, 4);          -- Dragon Quest XI → JRPG
`;

const dbUrl = process.argv[2];
const client = new Client({ connectionString: dbUrl });
await client.connect();
await client.query(QUERY);
await client.end();
