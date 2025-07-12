const mongoose = require("mongoose");

const CakeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: false 
  },
  guestId: { 
    type: String, required: false 
  },
  cakeId: { 
    type: String 
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  
  price:{
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Cake", CakeSchema);