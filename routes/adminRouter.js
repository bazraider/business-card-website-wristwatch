const adminRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { admin } = require('../db/models');

adminRouter.get('/login', async (req, res) => {
  res.render('admin/login');
});

adminRouter.post('/register', async (req, res) => {
  // console.log('req body ===>', req.body);
  const { inputName, inputMail, inputPass } = req.body;
  // console.log(req.body);
  const hash = await bcrypt.hash(inputPass, 10);
  const administrator = await admin.create({
    name: inputName, email: inputMail, password: hash,
  });
  // req.session.admin = administrator.dataValues.name; // - тут не используем так как сначала надо авторизовать права админа
  // console.log('all good!!! ====>', req.session.admin);
  res.send('ваша заявка на получение прав администратора принята');
});

adminRouter.post('/login', async (req, res) => {
  const { inputMail, inputPass } = req.body;
  const administrator = await admin.findOne({ where: { email: inputMail } });
  // console.log(administrator);
  if (administrator.approved) {
    const passwordCheck = await bcrypt.compare(inputPass, administrator.password);
    // console.log('login ----->', passwordCheck);
    if (passwordCheck) {
      req.session.admin = administrator.dataValues.name;
      res.redirect('/'); // успешный вход
    } else {
      res.send('неправильный пароль'); // ! пароль не правильный
    }
  } else {
    res.send('вам еще не одобрили права администратора');
  }
  // res.send(superUser); // когда создали if else - удаляем
});

adminRouter.get('/logout', async (req, res) => {
  if (req.session.admin) {
    await req.session.destroy();
    res.clearCookie('MyCookieName');
    res.redirect('/');
  } else {
    res.redirect('main');
  }
});

module.exports = adminRouter;
