const mongoose = require("mongoose");

const racunSchema = new mongoose.Schema(
  {
    artikal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artikal",
    },
    kolicina: {
      type: Number,
      required: [true, "Račun mora imati količinu"],
    },
    iznos: {
      type: Number,
      required: [true, "Račun mora imati cijenu."],
    },
    istekGarancije: {
      type: Date,
    },
    radnik: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Radnik",
    },
    nacinPlacanja: {
      type: String,
      required: [true, "Artikal mora imati način plaćanja."],
      enum: ["Karticno", "Gotovinsko"],
    },
    imeKupca: {
      type: String,
    },
    prezimeKupca: {
      type: String,
    },
    adresaKupca: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

racunSchema.pre("find", async function (next) {
  this.populate({
    path: "artikal",
  });
  next();
});

const Racun = mongoose.model("Racun", racunSchema);

module.exports = Racun;
