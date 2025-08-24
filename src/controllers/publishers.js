import { Publishers } from '../db.js';

export async function listPublishers(_req, res) {
  const publishers = await Publishers.getAll();
  res.render('list-publishers', { publishers });
}

export async function getPublisher(req, res) {
  const publisher = await Publishers.getOne(req.params.id);
  res.render('get-publisher', { publisher });
}

export function addPublisherGet(_req, res) {
  res.render('add-publisher');
}

export async function addPublisherPost(req, res) {
  const publisher = await Publishers.addOne(req.body);
  res.redirect(`/publishers/${publisher.id}`);
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
