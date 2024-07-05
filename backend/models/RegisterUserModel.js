const mongoose = require("mongoose");

// Define order subschema for electric cars
const electricCarOrderSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'electriccarmodel', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
});

// Define order subschema for gas cars
const gasCarOrderSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'gascarmodel', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
});

// Main user schema 
var registeruser = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  addedElectricCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'electriccarmodel' }],
  addedGasCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gascarmodel' }],
  boughtElectricCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'electriccarmodel' }],
  boughtGasCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gascarmodel' }],
  favourites: [
    {
      car: { type: mongoose.Schema.Types.ObjectId, refPath: 'favourites.carType' },
      carType: { type: String, enum: ['gascarmodel', 'electriccarmodel'] }
    }
  ],
  electricCarOrders: [electricCarOrderSchema], // Add electric car orders field
  gasCarOrders: [gasCarOrderSchema],           // Add gas car orders field
  requestOrders:[{type: mongoose.Schema.Types.ObjectId, ref: 'buyingform'}]
});

module.exports = mongoose.model("registeruser", registeruser, "registeruser");
