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

export async function editGenreGet(req, res) {
  const genre = await Genres.getOne(req.params.id);
  res.render('edit-genre', { genre });
}

export async function editGenrePost(req, res) {
  const genre = await Genres.editOne({ id: req.params.id, ...req.body });
  res.redirect(`/genres/${genre.id}`);
}

export function deleteGenre(_req, res) {
  res.send('POST /genres/:id/delete');
}
