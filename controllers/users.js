const mongooseError = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const IncorrectData = require('../errors/IncorrectData');
const AuthError = require('../errors/AuthError');

const {
  NOT_FOUND_MESSAGE,
  AUTH_ERROR_MESSAGE,
  USER_EXISTS_MESSAGE,
  INCORRECT_MESSAGE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) { throw new NotFoundError(NOT_FOUND_MESSAGE); }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError(NOT_FOUND_MESSAGE); })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash })
      .then((user) => res.status(201).send({
        name, email, _id: user._id,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(USER_EXISTS_MESSAGE));
          return;
        }
        if (err instanceof mongooseError.ValidationError) {
          next(new IncorrectData(INCORRECT_MESSAGE));
          return;
        }
        next(err);
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(AUTH_ERROR_MESSAGE);
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) { throw new AuthError(AUTH_ERROR_MESSAGE); }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'my-jwt-token',
            { expiresIn: '7d' },
          );
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
