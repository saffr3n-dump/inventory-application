import { Games } from '../db.js';

export async function listGames(_req, res) {
  const games = await Games.getAll();
  res.render('list-games', { games });
}

export async function getGame(req, res) {
  const game = await Games.getOne(req.params.id);
  res.render('get-game', { game });
}

export function addGameGet(_req, res) {
  res.send('GET /games/add');
}

export function addGamePost(_req, res) {
  res.send('POST /games/add');
}

export function editGameGet(_req, res) {
  res.send('GET /games/:id/edit');
}

export function editGamePost(_req, res) {
  res.send('POST /games/:id/edit');
}

export function deleteGame(_req, res) {
  res.send('POST /games/:id/delete');
}
