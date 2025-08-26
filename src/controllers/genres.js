import { Genres } from '../db.js';

export async function listGenres(_req, res) {
  const genres = await Genres.getAll();
  res.render('list-genres', { genres });
}

export async function getGenre(req, res) {
  const { id } = req.params;
  const genre = await Genres.getOne(id);
  if (!genre) throw new Error(`There is no genre with the ID ${id}.`);
  res.render('get-genre', { genre });
}

export function addGenreGet(_req, res) {
  res.render('add-genre');
}

export async function addGenrePost(req, res) {
  try {
    const genre = await Genres.addOne(req.body);
    res.redirect(`/genres/${genre.id}`);
  } catch {
    throw new Error(`The genre '${req.body.name}' already exists.`);
  }
}

export async function editGenreGet(req, res) {
  const { id } = req.params;
  const genre = await Genres.getOne(id);
  if (!genre) throw new Error(`There is no genre with the ID ${id}.`);
  res.render('edit-genre', { genre });
}

export async function editGenrePost(req, res) {
  try {
    const genre = await Genres.editOne({ id: req.params.id, ...req.body });
    res.redirect(`/genres/${genre.id}`);
  } catch {
    throw new Error(`The genre '${req.body.name}' already exists.`);
  }
}

export function deleteGenre(_req, res) {
  res.send('POST /genres/:id/delete');
}
