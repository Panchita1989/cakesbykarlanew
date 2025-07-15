const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      tls: true,
      // tlsAllowInvalidCertificates: true, // nur zum Testen aktivieren, dann wieder auskommentieren
      // useNewUrlParser und useUnifiedTopology sind seit v6 default, daher meist nicht nötig
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
