const router = require('express').Router();

const {
  getUserMe,
  updateProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserMe);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', updateProfile);

module.exports = router;
