require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT } = require('./utils/constants');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json());
app.use(requestLogger);


app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));


app.use(errorLogger);
app.use(errors());
app.use('./middlewares/handleErrors');
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
