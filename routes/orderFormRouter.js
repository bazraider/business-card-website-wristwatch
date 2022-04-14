const express = require('express');
const db = require('../db/models');
const multer = require('../middleware/multer.middleware');
const mailer = require('../nodemailer');

const router = express.Router();

router.post('/', multer.single('img'), async (req, res) => {
  // console.log(req.body.name);
  // console.log(req.body.img);
  const {
    name, email, phone, message,
  } = req.body;
  const { path } = req.file;

  try {
    await db.Client.create(
      {
        name: name.toLowerCase(),
        email,
        phone,
        img: path.slice(6),
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );
    // Отправляем сообщение клиенту
    const emailMessage = {
      to: email,
      subject: 'Заявка на сайте WATCHERS',
      text: `${name}, добрый день.
      Вы успешно оставили заявку на сайте Watchers!

      Наши сотрудники свяжутся с Вами в ближайшее время`,
    };
    mailer(emailMessage);

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

module.exports = router;
