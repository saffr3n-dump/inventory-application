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

export async function addGenrePost(req, res) {
  const genre = await Genres.addOne(req.body);
  res.redirect(`/genres/${genre.id}`);
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
