const mongoose = require("mongoose");

const electricCarModelSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    topspeed: { type: String, required: true },
    time60: { type: String, required: true },
    range: { type: String, required: true },
    colour: { type: String, required: true },
    interior: { type: String, required: true },
    wheel: { type: String, required: true },
    description: { type: String, required: true },
    isDisplayed: {type:Boolean, default:false},
    isSold: {type:Boolean, default:false},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'registeruser', required: true }
});

module.exports = mongoose.model("electriccarmodel", electricCarModelSchema, "electriccarmodel");
