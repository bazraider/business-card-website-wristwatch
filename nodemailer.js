const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'watchers.elbrus@bk.ru',
    pass: '84bAGBDQ5WH2mM1Z0Pq1',
  },
}, {
  from: 'Watchers Shop <watchers.elbrus@bk.ru>',
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log('mailer err ====>', err);
    console.log('Email sent: ', info);
  });
};

module.exports = mailer;
