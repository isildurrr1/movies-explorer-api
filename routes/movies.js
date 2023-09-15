const movieRouter = require('express').Router();

const {
  createMovieValid,
  checkMovieIdValid,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies); // возвращает все сохранённые текущим пользователем фильмы

movieRouter.post('/', createMovieValid, createMovie); // создаёт фильм

movieRouter.delete('/:_id', checkMovieIdValid, deleteMovie); // удаляет сохранённый фильм по id

module.exports = movieRouter;
