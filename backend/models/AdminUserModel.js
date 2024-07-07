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

var adminuser = new mongoose.Schema({ 
  username: { type: String, required: true }, 
  email: { type: String, unique:true },
  password: { type: String, required: true },
  addedElectricCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'electriccarmodel' }],
  addedGasCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gascarmodel' }],
  electricCarOrders: [electricCarOrderSchema], // Add electric car orders field
  gasCarOrders: [gasCarOrderSchema],           // Add gas car orders field
  requestOrders:[{type: mongoose.Schema.Types.ObjectId, ref: 'buyingform'}]
});

module.exports = mongoose.model("adminuser", adminuser, "adminuser");