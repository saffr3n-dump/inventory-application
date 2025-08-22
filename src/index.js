import express from 'express';
import path from 'path';

const app = express();

app.set('views', path.resolve(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(import.meta.dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

const port = Number(process.env.PORT || '3000');
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server started on port ${port}`);
});
