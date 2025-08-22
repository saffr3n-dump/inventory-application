import { Router } from 'express';
import {
  getAllPublishers,
  getPublisher,
  addPublisherGet,
  addPublisherPost,
  editPublisherGet,
  editPublisherPost,
  deletePublisher,
} from '../controllers/publishers.js';

const publishersRouter = Router();

publishersRouter.get('/', getAllPublishers);
publishersRouter.get('/:id', getPublisher);
publishersRouter.get('/add', addPublisherGet);
publishersRouter.post('/add', addPublisherPost);
publishersRouter.get('/:id/edit', editPublisherGet);
publishersRouter.post('/:id/edit', editPublisherPost);
publishersRouter.post('/:id/delete', deletePublisher);

export default publishersRouter;
