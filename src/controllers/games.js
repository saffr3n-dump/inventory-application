import { Games, Genres, Publishers } from '../db.js';

export async function listGames(_req, res) {
  const games = await Games.getAll();
  res.render('list-games', { games });
}

export async function getGame(req, res) {
  const { id } = req.params;
  const game = await Games.getOne(id);
  if (!game) throw new Error(`There is no game with the ID ${id}.`);
  res.render('get-game', { game });
}

export async function addGameGet(_req, res) {
  const publishers = await Publishers.getAll();
  const genres = await Genres.getAll();
  if (!publishers.length || !genres.length) {
    throw new Error('Need at least 1 genre and 1 publisher to add a game.');
  }
  res.render('add-game', { publishers, genres });
}

export async function addGamePost(req, res) {
  const game = await Games.addOne(req.body);
  res.redirect(`/games/${game.id}`);
}

export async function editGameGet(req, res) {
  const { id } = req.params;
  const game = await Games.getOne(id);
  if (!game) throw new Error(`There is no game with the ID ${id}.`);
  const publishers = await Publishers.getAll();
  const genres = await Genres.getAll();
  res.render('edit-game', { game, publishers, genres });
}

export async function editGamePost(req, res) {
  const game = await Games.editOne({ id: req.params.id, ...req.body });
  res.redirect(`/games/${game.id}`);
}

export async function deleteGame(req, res) {
  const { id } = req.params;
  await Games.deleteOne(id);
  res.redirect('/games');
}
