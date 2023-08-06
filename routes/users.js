const userRouter = require('express').Router();

const { updateProfileValid } = require('../middlewares/validation');

const {
  getUserMe,
  updateProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getUserMe);

// обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', updateProfileValid, updateProfile);

module.exports = userRouter;
