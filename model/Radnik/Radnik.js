const mongoose = require("mongoose");

const radnikSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: [true, "Unesite ime radnika"],
  },
  prezime: {
    type: String,
    required: [true, "Unesite prezime radnika"],
  },
  uloga: {
    type: String,
    enum: ["Radnik na pultu", "Radnik na skladistu", "Admin"],
    required: [true, "Unesite ulogu radnika"],
  },
  username: {
    type: String,
    required: [true, "Unesite korisničko ime radnika"],
  },
  password: {
    type: String,
    required: [true, "Unesite korisničku šifru radnika"],
  },
  zadnjiPristup: {
    type: Date,
  },
});

const Radnik = mongoose.model("Radnik", radnikSchema);

module.exports = Radnik;
