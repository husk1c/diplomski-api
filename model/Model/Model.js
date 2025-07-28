const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: [true, "Unesite naziv."],
  },
  godisteStart: {
    type: Number,
    required: [true, "Unesite početak godišta."],
  },
  godisteEnd: {
    type: Number,
    required: [true, "Unesite kraj godišta."],
  },
});

const Model = mongoose.model("Model", modelSchema);

module.exports = Model;
