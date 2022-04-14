const express = require('express');
const router = express.Router();
// const csvController = require('../public/js/csv.controller');
const { append } = require('express/lib/response');
const { Client } = require('../db/models');
const multer = require('../middleware/multer.middleware');
const CsvParser = require("json2csv").Parser;

router.get('/', (req, res) => {
  res.render('admin/personalArea');
});

router.get('/download', async (req, res) => {
  const clients = await Client.findAll();
  const arrayClients = [];
  clients.forEach((client) => {
    const { id, name, email, phone } = client;
    arrayClients.push({ id, name, email, phone });
  });

  const csvFields = ['id', 'name', 'email', 'phone'];
  const csvParser = new CsvParser({ csvFields });
  const csvData = csvParser.parse(arrayClients);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=clients.csv');
  res.status(200).end(csvData);
});

module.exports = router;
