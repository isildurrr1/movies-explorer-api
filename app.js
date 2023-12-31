require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT, DB_ADDRESS } = require('./utils/constants');

const router = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());

mongoose.connect(DB_ADDRESS, {});

app.use(express.json());
app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
