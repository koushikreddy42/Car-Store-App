const mongoose = require("mongoose");

var adminuser = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique:true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("adminuser", adminuser, "adminuser");