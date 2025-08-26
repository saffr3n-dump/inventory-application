import { Publishers } from '../db.js';

export async function listPublishers(_req, res) {
  const publishers = await Publishers.getAll();
  res.render('list-publishers', { publishers });
}

export async function getPublisher(req, res) {
  const { id } = req.params;
  const publisher = await Publishers.getOne(id);
  if (!publisher) throw new Error(`There is no publisher with the ID ${id}.`);
  res.render('get-publisher', { publisher });
}

export function addPublisherGet(_req, res) {
  res.render('add-publisher');
}

export async function addPublisherPost(req, res) {
  try {
    const publisher = await Publishers.addOne(req.body);
    res.redirect(`/publishers/${publisher.id}`);
  } catch {
    throw new Error(`The publisher '${req.body.name}' already exists.`);
  }
}

export async function editPublisherGet(req, res) {
  const { id } = req.params;
  const publisher = await Publishers.getOne(id);
  if (!publisher) throw new Error(`There is no publisher with the ID ${id}.`);
  res.render('edit-publisher', { publisher });
}

export async function editPublisherPost(req, res) {
  try {
    const publisher = await Publishers.editOne({
      id: req.params.id,
      ...req.body,
    });
    res.redirect(`/publishers/${publisher.id}`);
  } catch {
    throw new Error(`The publisher '${req.body.name}' already exists.`);
  }
}

export async function deletePublisher(req, res) {
  try {
    const { id } = req.params;
    await Publishers.deleteOne(id);
    res.redirect('/publishers');
  } catch {
    throw new Error(
      'Cannot delete a publisher while there are still games associated with it.',
    );
  }
}
