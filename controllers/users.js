const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) { throw new NotFoundError('Не найдено'); }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError('Не найдено'); })
    .then((user) => res.send(user))
    .catch(next);
};
