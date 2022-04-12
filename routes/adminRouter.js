const adminRouter = require('express').Router();

adminRouter.get('/login', async (req, res) => {
  res.render('admin/login');
});

module.exports = adminRouter;
