const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  location: String,
  date: String,
  photoUrl: String,
});

module.exports = mongoose.model("Event", eventSchema);
