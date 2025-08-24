import { Genres } from '../db.js';

export async function listGenres(_req, res) {
  const genres = await Genres.getAll();
  res.render('list-genres', { genres });
}

export async function getGenre(req, res) {
  const genre = await Genres.getOne(req.params.id);
  res.render('get-genre', { genre });
}

export function addGenreGet(_req, res) {
  res.render('add-genre');
}

export function addGenrePost(_req, res) {
  res.send('POST /genres/add');
}

export function editGenreGet(_req, res) {
  res.send('GET /genres/:id/edit');
}

export function editGenrePost(_req, res) {
  res.send('POST /genres/:id/edit');
}

export function deleteGenre(_req, res) {
  res.send('POST /genres/:id/delete');
}
