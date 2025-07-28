const mongoose = require("mongoose");

const kategorijaSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: [true, "Kategorija mora imati naziv."],
  },
  podkategorije: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Podkategorija",
  },
});

kategorijaSchema.pre("findOne", async function (next) {
  this.populate({
    path: "podkategorije",
  });
  next();
});

const Kategorija = mongoose.model("Kategorija", kategorijaSchema);

module.exports = Kategorija;
