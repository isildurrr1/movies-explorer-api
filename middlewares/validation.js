const { celebrate, Joi } = require('celebrate');

const linkRegEx = /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const createUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const updateProfileValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const createMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegEx),
    trailerLink: Joi.string().required().pattern(linkRegEx),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(linkRegEx),
    movieId: Joi.number().required(),
  }),
});

const checkMovieIdValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  loginValid,
  createUserValid,
  updateProfileValid,
  createMovieValid,
  checkMovieIdValid,
};
