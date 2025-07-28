const mongoose = require("mongoose");

const podkategorijaSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: [true, "Podkategorija mora imati naziv."],
  },
});

const Podkategorija = mongoose.model("Podkategorija", podkategorijaSchema);

module.exports = Podkategorija;
