const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

const {
  loginValid,
  createUserValid,
} = require('../middlewares/validation');

const auth = require('../middlewares/auth');

router.post('/signin', loginValid, login);
router.post('/signup', createUserValid, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

module.exports = router;
