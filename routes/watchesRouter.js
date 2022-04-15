const express = require('express');
const db = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const watches = await db.Product.findAll();
  res.send(watches);
});

router.get('/:id', async (req, res) => {
  const watch = await db.Product.findOne({ where: { id: req.params.id } });
  res.send(watch);
});

module.exports = router;
