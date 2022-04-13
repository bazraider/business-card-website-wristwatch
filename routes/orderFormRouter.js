const express = require('express');
const db = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      name, email, phone, img, message,
    } = req.body;
    console.log(name, email, phone, img, message);
    console.log(db.client);
    await db.client.create(
      {
        name: name.toLowerCase(),
        email,
        phone,
        img,
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
