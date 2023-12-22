const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '725dc456f18d65d90009516a1ca4551b-30b58138-32944971'
});

const sendEmail = (to, subject, text, html) => {
  const from =  "<hdeskcompany@gmail.com>";

  return mg.messages.create('sandbox4dbac3751c124058b6444f9b5b1ffca3.mailgun.org', {
    from,
    to: Array.isArray(to) ? to : [to], 
    subject,
    text,
    html
  });
};



module.exports = { sendEmail };




