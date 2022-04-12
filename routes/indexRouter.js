const indexRouter = require('express').Router();

indexRouter.get('/', async (req, res) => {
  res.render('index');
});

module.exports = indexRouter;
