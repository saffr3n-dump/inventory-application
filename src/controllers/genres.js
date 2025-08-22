export function getAllGenres(_req, res) {
  res.send('GET /genres');
}

export function getGenre(_req, res) {
  res.send('GET /genres/:id');
}

export function addGenreGet(_req, res) {
  res.send('GET /genres/add');
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
