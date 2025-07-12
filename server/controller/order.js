const Order = require('../model/Order');
const nodemailer = require('nodemailer')

exports.postOrder = async (req, res, next) => {
  try {
    const { cakes, pickUpDate, customer } = req.body;

    if (!cakes || cakes.length === 0) {
      return res.status(400).json({ msg: 'No Cakes in your order' });
    }

    if (!pickUpDate) {
      return res.status(400).json({ msg: 'Missing pickUpDate' });
    }

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ msg: 'Client Information not complete' });
    }

    const newOrder = new Order({
      cakes,
      pickUpDate,
      customer,
    });

    await newOrder.save();

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
      subject: `New Order From ${customer.name}`,
      text: `Order Details:
        Cake: ${cakes.map(c => `${c.name} x${c.quantity}`).join(', ')}
        Pick up Date: ${pickUpDate}
        Client: ${customer.name}, Tel: ${customer.phone}, Email: ${customer.email || 'keine Email'}`,
    });

    res.status(201).json({ msg: 'Order successfully saved', orderId: newOrder._id });
  } catch (err) {
    console.error('Fehler beim Speichern der Bestellung:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
