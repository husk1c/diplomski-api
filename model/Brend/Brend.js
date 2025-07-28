const mongoose = require("mongoose");

const brendSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: [true, "Unesire brend vozila."],
  },
  modeli: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
    },
  ],
});

brendSchema.pre("findOne", async function (next) {
  this.populate({
    path: "modeli",
  });
  next();
});

const Brend = mongoose.model("Brend", brendSchema);

module.exports = Brend;
