import { Router } from 'express';
import {
  listGames,
  getGame,
  addGameGet,
  addGamePost,
  editGameGet,
  editGamePost,
  deleteGame,
} from '../controllers/games.js';

const gamesRouter = Router();

gamesRouter.get('/', listGames);
gamesRouter.get('/add', addGameGet);
gamesRouter.post('/add', addGamePost);
gamesRouter.get('/:id', getGame);
gamesRouter.get('/:id/edit', editGameGet);
gamesRouter.post('/:id/edit', editGamePost);
gamesRouter.post('/:id/delete', deleteGame);

export default gamesRouter;
