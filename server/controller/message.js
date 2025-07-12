const Order = require('../model/Order');
const nodemailer = require('nodemailer')

exports.postMessage = async (req, res, next) => {
  try {
     const { name, email, message } = req.body;


    if (!name || !email || !message) {
      return res.status(400).json({ msg: 'Please fill in all fields' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS

      }
    })
    
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'tigrepetanque@gmail.com',
      subject: `New Contact form from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message:${message}`
    });

    res.status(201).json({ msg: 'Message successfully sent'});
  } catch (err) {
    console.error('Error sending contact messsage', err);
    res.status(500).json({ error: 'Server error' });
  }
};
