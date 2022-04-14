const async = require('hbs/lib/async');

const indexRouter = require('express').Router();

indexRouter.get('/', async (req, res) => {
  res.render('index');
});

// indexRouter.get('/cards', async (req, res) => {
//   res.render('cards');
// });

module.exports = indexRouter;
