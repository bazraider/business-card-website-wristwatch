// модуль который загружает переменные среды из файла .env в process.env
require('dotenv').config();
// модуль для работы с путями в файловой системе
const path = require('path');
// const bcrypt = require('bcrypt'); // шифрование пароля
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
// для хранения даннах из куки
const FileStore = require('session-file-store')(expressSession);
const hbs = require('hbs');
const { sequelize } = require('./db/models');
const indexRouter = require('./routes/indexRouter');
const orderFormRouter = require('./routes/orderFormRouter');
const adminRouter = require('./routes/adminRouter');
const { adminName, sessionLogger } = require('./middleware/common');

const app = express();
const PORT = process.env.PORT ?? 3000;

const sessionConfig = {
  store: new FileStore(), // добавить после установки session-file-store
  secret: 'MyCookieName',
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000, // устанавливаем сколько живет кука
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
};

app.locals.title = 'Магазин часов';

// app.set — задать внутренние настройки сервера
app.set('view engine', 'hbs'); // задать движок для генерации шаблонов
app.set('views', path.join(__dirname, 'views')); // задать папку с шаблонами
hbs.registerPartials(path.join(__dirname, 'views', 'partials')); // задать папку с частичными шаблонами (partials)

app.use(cookieParser());
app.use(expressSession(sessionConfig));
app.use(adminName);

// app.use — подключить промежуточные функции
app.use(express.urlencoded({ extended: true })); // для чтения тела запросов в формате urlencoded
app.use(express.json()); // для чтения тела запросов в формате JSON
app.use(morgan('dev')); // для логирования входящих запросов и ответов на них
app.use(express.static(path.join(__dirname, 'public')));

// Подключение роутеров
app.use('/', indexRouter);
<<<<<<< HEAD
app.use('/', orderFormRouter);
=======
app.use('/', adminRouter);
>>>>>>> fa0fa94c8858d622a98a9dca864df6b76351ac61

// Запуск сервера — начать прослушивание порта
app.listen(PORT, async () => {
  /* eslint-disable no-console */
  console.log(`The server is listening on port ${PORT}...`);

  try {
    await sequelize.authenticate({ logging: false });
    console.log('Connecting to the database successfully');
  } catch (error) {
    console.log('Failed to connect to DB');
    console.log(error.message);
  }
  /* eslint-enable */
});
