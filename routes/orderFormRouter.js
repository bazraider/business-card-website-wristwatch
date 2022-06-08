const express = require('express');
const db = require('../db/models');
const multer = require('../middleware/multer.middleware');
const mailer = require('../nodemailer');

const router = express.Router();

router.post('/', multer.array('img'), async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const clientC = await db.Client.create({
      name: name.toLowerCase(),
      email,
      phone,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Отправляем сообщение клиенту
    const emailMessage = {
      to: email,
      subject: 'Заявка на сайте WATCHERS',
      text: `${name}, добрый день.
      Вы успешно оставили заявку на сайте Watchers!

      Наши сотрудники свяжутся с Вами в ближайшее время`,
    };
    mailer(emailMessage);

    if (req.files) {
      await db.Picture.bulkCreate(
        req.files.map((file) => ({
          img: file.path.slice(6),
          clientId: clientC.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      );
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

module.exports = router;
