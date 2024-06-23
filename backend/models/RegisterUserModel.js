const mongoose = require("mongoose");

var registeruser = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: {type:String},
  addedElectricCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'electriccarmodel' }],
  addedGasCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gascarmodel' }],
  boughtElectricCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'electriccarmodel' }],
  boughtGasCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gascarmodel' }],
  favourites: [
    {
      car: { type: mongoose.Schema.Types.ObjectId, refPath: 'favourites.carType' },
      carType: { type: String, enum: ['gascarmodel', 'electriccarmodel'] }
    }
  ]
});

module.exports = mongoose.model("registeruser", registeruser, "registeruser");