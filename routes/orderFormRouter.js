const express = require('express');
// const client = require('pg/lib/native/client');
const db = require('../db/models');
const multer = require('../middleware/multer.middleware');

const router = express.Router();

router.post('/', multer.array('img'), async (req, res) => {
  try {
  // console.log(name, email, phone, message);
  // console.log(path);

    const {
      name, email, phone, message,
    } = req.body;
    // const { path } = req.files;

    console.log(name, email, phone, message);
    console.log(req.files[0].path);

    const clientC = await db.Client.create(
      {
        name: name.toLowerCase(),
        email,
        phone,
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );

    await db.Picture.bulkCreate(req.files.map((file) => ({
      img: file.path.slice(6), clientId: clientC.id, createdAt: new Date(), updatedAt: new Date(),
    })));

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

module.exports = router;
