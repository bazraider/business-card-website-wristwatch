const express = require('express');
const db = require('../db/models');
const multer = require('../middleware/multer.middleware');

const router = express.Router();

router.post('/', multer.single('img'), async (req, res) => {
  // console.log(req.body.name);
  // console.log(req.body.img);
  const {
    name, email, phone, message,
  } = req.body;
  const { path } = req.file;

  try {
    await db.client.create(
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

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

module.exports = router;
