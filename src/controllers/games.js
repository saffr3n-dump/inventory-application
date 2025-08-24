import { Games, Genres, Publishers } from '../db.js';

export async function listGames(_req, res) {
  const games = await Games.getAll();
  res.render('list-games', { games });
}

export async function getGame(req, res) {
  const game = await Games.getOne(req.params.id);
  res.render('get-game', { game });
}

export async function addGameGet(_req, res) {
  const publishers = await Publishers.getAll();
  const genres = await Genres.getAll();
  res.render('add-game', { publishers, genres });
}

export async function addGamePost(req, res) {
  const game = await Games.addOne(req.body);
  res.redirect(`/games/${game.id}`);
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
