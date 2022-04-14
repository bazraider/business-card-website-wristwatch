const indexRouter = require('express').Router();
const { Product } = require('../db/models');

indexRouter.get('/', async (req, res) => {
<<<<<<< HEAD
  res.render('index');
});

// indexRouter.get('/cards', async (req, res) => {
//   res.render('cards');
// });
=======
  const products = await Product.findAll({ raw: true });
  // console.log(products);
  res.render('index', { products });
});
>>>>>>> 6b44e4d75adc8d85081e16b5a2dadc17883c2959

module.exports = indexRouter;
