import express from 'express';
import path from 'path';
import gamesRouter from './routers/games.js';
import genresRouter from './routers/genres.js';
import publishersRouter from './routers/publishers.js';

const app = express();

app.set('views', path.resolve(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(import.meta.dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => res.redirect('/games'));
app.use('/games', gamesRouter);
app.use('/genres', genresRouter);
app.use('/publishers', publishersRouter);

app.use(() => {
  throw new Error('The requested page does not exist.');
});
app.use((err, _req, res, _next) => {
  console.error(err);
  res.render('error-page', { error: err });
});

const port = Number(process.env.PORT || '3000');
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server started on port ${port}`);
});
