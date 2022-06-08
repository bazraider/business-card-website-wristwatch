const express = require('express');

const router = express.Router();
const CsvParser = require('json2csv').Parser;
const { Client, Product, Picture } = require('../db/models');

router.get('/', async (req, res) => {
  const clients = await Client.findAll({ include: Picture });
  res.render('admin/personalArea', { clients });
});

router.get('/download', async (req, res) => {
  const clients = await Client.findAll();
  const arrayClients = [];
  clients.forEach((client) => {
    const { id, name, email, phone } = client;
    arrayClients.push({
      id,
      name,
      email,
      phone,
    });
  });

  const csvFields = ['id', 'name', 'email', 'phone'];
  const csvParser = new CsvParser({ csvFields });
  const csvData = csvParser.parse(arrayClients);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=clients.csv');
  res.status(200).end(csvData);
});

router.get('/downloadProducts', async (req, res) => {
  const products = await Product.findAll();
  const arrayProducts = [];
  products.forEach((product) => {
    const { id, title, description, price } = product;
    arrayProducts.push({
      id,
      title,
      description,
      price,
    });
  });

  const csvFields = ['id', 'title', 'description', 'price'];
  const csvParser = new CsvParser({ csvFields });
  const csvData = csvParser.parse(arrayProducts);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
  res.status(200).end(csvData);
});

module.exports = router;
