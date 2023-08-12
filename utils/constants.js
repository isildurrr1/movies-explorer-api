const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const LINK_VALIDATION_REG_EXP = /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

const SUCCESS_MESSAGE = 'Успешно';
const NOT_FOUND_MESSAGE = 'Не найдено';
const NOT_RIGHTS_MESSAGE = 'Нет прав';
const AUTH_ERROR_MESSAGE = 'Ошибка авторизации';
const USER_EXISTS_MESSAGE = 'Пользователь уже существует';
const INCORRECT_MESSAGE = 'Некорректные данные';
const SERVER_ERROR_MESSAGE = 'Ошибка на сервере';
const LINK_ERROR_VALID_MESSAGE = 'Некорректная ссылка';

module.exports = {
  PORT,
  DB_ADDRESS,
  LINK_VALIDATION_REG_EXP,
  SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  NOT_RIGHTS_MESSAGE,
  AUTH_ERROR_MESSAGE,
  USER_EXISTS_MESSAGE,
  INCORRECT_MESSAGE,
  SERVER_ERROR_MESSAGE,
  LINK_ERROR_VALID_MESSAGE,
};
