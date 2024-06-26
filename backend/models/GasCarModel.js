const mongoose = require("mongoose");

const gasCarModelSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    topspeed: { type: String, required: true },
    time60: { type: String, required: true },
    mileage: { type: String, required: true },
    engine: { type: Number, required: true },
    gearbox: { type: String, required: true },
    transmission: { type: String, required: true },
    colour: { type: String, required: true },
    interior: { type: String, required: true },
    wheel: { type: String, required: true },
    description: { type: String, required: true },
    safety: { type: String},
    technology: { type: String},
    performance: { type: String},
    cylinders: { type: Number},
    drivetrain: { type: String},
    isDisplayed: {type:Boolean, default:false},
    isSold: {type:Boolean, default:false},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'registeruser', required: true }
});

module.exports = mongoose.model("gascarmodel", gasCarModelSchema, "gascarmodel");
