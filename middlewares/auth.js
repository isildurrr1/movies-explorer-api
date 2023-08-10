const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { AUTH_ERROR_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(AUTH_ERROR_MESSAGE));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-jwt-token');
  } catch (err) {
    return next(new AuthError(AUTH_ERROR_MESSAGE));
  }
  req.user = payload;
  return next();
};
