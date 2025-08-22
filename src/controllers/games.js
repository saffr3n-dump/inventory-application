export function getAllGames(_req, res) {
  res.send('GET /games');
}

export function getGame(_req, res) {
  res.send('GET /games/:id');
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
