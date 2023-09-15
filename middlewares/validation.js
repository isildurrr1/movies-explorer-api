const { celebrate, Joi } = require('celebrate');
const { LINK_VALIDATION_REG_EXP } = require('../utils/constants');

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
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const createMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_VALIDATION_REG_EXP),
    trailerLink: Joi.string().required().pattern(LINK_VALIDATION_REG_EXP),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(LINK_VALIDATION_REG_EXP),
    movieId: Joi.number().required(),
  }),
});

const checkMovieIdValid = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  loginValid,
  createUserValid,
  updateProfileValid,
  createMovieValid,
  checkMovieIdValid,
};
