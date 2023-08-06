const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NotRightsError = require('../errors/NotRightsError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => { throw new NotFoundError('Не найдено'); })
    .then((movie) => {
      if (`${movie.owner}` !== req.user._id) {
        throw new NotRightsError('Недостаточно прав');
      }
      Movie.findByIdAndRemove(req.params._id)
        .orFail(() => { throw new NotFoundError('Не найдено'); })
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch(next);
};
