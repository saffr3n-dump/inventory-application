export function getAllPublishers(_req, res) {
  res.send('GET /publishers');
}

export function getPublisher(_req, res) {
  res.send('GET /publishers/:id');
}

export function addPublisherGet(_req, res) {
  res.send('GET /publishers/add');
}

export function addPublisherPost(_req, res) {
  res.send('POST /publishers/add');
}

export function editPublisherGet(_req, res) {
  res.send('GET /publishers/:id/edit');
}

export function editPublisherPost(_req, res) {
  res.send('POST /publishers/:id/edit');
}

export function deletePublisher(_req, res) {
  res.send('POST /publishers/:id/delete');
}
