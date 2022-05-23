const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    photoUrl: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Photo", photoSchema);
