const indexRouter = require('express').Router();
const { Product } = require('../db/models');

indexRouter.get('/', async (req, res) => {
  const products = await Product.findAll({ raw: true });
  res.render('index', { products });
});

module.exports = indexRouter;
