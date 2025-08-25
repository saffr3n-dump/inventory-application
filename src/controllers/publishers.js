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

export async function editPublisherGet(req, res) {
  const publisher = await Publishers.getOne(req.params.id);
  res.render('edit-publisher', { publisher });
}

export async function editPublisherPost(req, res) {
  const publisher = await Publishers.editOne({
    id: req.params.id,
    ...req.body,
  });
  res.redirect(`/publishers/${publisher.id}`);
}

export function deletePublisher(_req, res) {
  res.send('POST /publishers/:id/delete');
}
