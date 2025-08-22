import { Router } from 'express';
import {
  getAllGenres,
  getGenre,
  addGenreGet,
  addGenrePost,
  editGenreGet,
  editGenrePost,
  deleteGenre,
} from '../controllers/genres.js';

const genresRouter = Router();

genresRouter.get('/', getAllGenres);
genresRouter.get('/:id', getGenre);
genresRouter.get('/add', addGenreGet);
genresRouter.post('/add', addGenrePost);
genresRouter.get('/:id/edit', editGenreGet);
genresRouter.post('/:id/edit', editGenrePost);
genresRouter.post('/:id/delete', deleteGenre);

export default genresRouter;
