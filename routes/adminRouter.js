const adminRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { Admin, Product } = require('../db/models');
const multer = require('../middleware/multer.middleware');

adminRouter.get('/login', async (req, res) => {
  res.render('admin/login');
});

adminRouter.post('/register', async (req, res) => {
  const { inputName, inputMail, inputPass } = req.body;
  try {
    const hash = await bcrypt.hash(inputPass, 10);
    await Admin.create({
      name: inputName,
      email: inputMail,
      password: hash,
    });
    res.sendStatus(200);
  } catch (err) {
    res.send(err.message);
  }
});

adminRouter.post('/login', async (req, res) => {
  const { inputMail, inputPass } = req.body;
  try {
    if (inputMail && inputPass) {
      const administrator = await Admin.findOne({
        where: { email: inputMail },
      });
      if (administrator.approved) {
        const passwordCheck = await bcrypt.compare(inputPass, administrator.password);
        if (passwordCheck) {
          req.session.admin = administrator.dataValues.name;
          res.redirect('/');
        } else {
          res.send('Пароль неверный');
        }
      } else {
        res.send('Вам еще не одобрили права администратора');
      }
    } else {
      res.send('Заполните все поля');
    }
  } catch (err) {
    res.send(err.message);
  }
});

adminRouter.get('/logout', async (req, res) => {
  if (req.session.admin) {
    await req.session.destroy();
    res.clearCookie('MyCookieName');
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

adminRouter.delete('/products/delete', async (req, res) => {
  if (req.session.admin) {
    const { id } = req.body;
    await Product.destroy({ where: { id } });
    res.sendStatus(200);
  } else {
    res.redirect('/');
  }
});

// Ручка на редактирование товара
adminRouter.get('/products/edit/:id', async (req, res) => {
  if (req.session.admin) {
    const entry = await Product.findOne({ where: { id: req.params.id } });
    res.render('admin/edit', { entry });
  } else {
    res.redirect('/');
  }
});

adminRouter.post('/products/edit/:id', multer.single('img'), async (req, res) => {
  if (req.session.admin) {
    const { path } = req.file;
    await Product.update(
      {
        title: req.body.title,
        description: req.body.description,
        img: path.slice(6),
        price: req.body.price,
      },
      {
        where: { id: req.params.id },
        returning: true,
        plain: true,
      },
    );
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

// Ручка на добавление нового товара
adminRouter.get('/products/newcard', async (req, res) => {
  if (req.session.admin) {
    res.render('admin/newcard');
  } else {
    res.redirect('/');
  }
});

adminRouter.post('/products/newcard', multer.single('img'), async (req, res) => {
  if (req.session.admin) {
    const { id, title, description, price } = req.body;
    const { path } = req.file;
    await Product.create(
      {
        title,
        description,
        img: path.slice(6),
        price,
      },
      {
        where: { id },
        returning: true,
        plain: true,
      },
    );
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

module.exports = adminRouter;
