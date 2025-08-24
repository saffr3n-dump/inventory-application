import { Router } from 'express';
import {
  listGenres,
  getGenre,
  addGenreGet,
  addGenrePost,
  editGenreGet,
  editGenrePost,
  deleteGenre,
} from '../controllers/genres.js';

const genresRouter = Router();

genresRouter.get('/', listGenres);
genresRouter.get('/add', addGenreGet);
genresRouter.post('/add', addGenrePost);
genresRouter.get('/:id', getGenre);
genresRouter.get('/:id/edit', editGenreGet);
genresRouter.post('/:id/edit', editGenrePost);
genresRouter.post('/:id/delete', deleteGenre);

export default genresRouter;
