const mongoose = require("mongoose");

const artikalSchema = new mongoose.Schema(
  {
    naziv: {
      type: String,
      required: [true, "Artikal mora imati naziv."],
    },
    opis: {
      type: String,
      required: [true, "Artikal mora imati opis."],
    },
    proizvodjac: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brend",
      required: [true, "Artikal mora imati Brend."],
    },
    kategorija: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kategorija",
      required: [true, "Artikal mora imati kategoriju."],
    },
    garantniPeriod: {
      type: Number,
      required: [true, "Artikal mora imati garantni period."],
    },
    cijena: {
      type: Number,
      required: [true, "Artikal mora imati cijenu."],
    },
    stanje: {
      type: Number,
      required: [true, "Artikal mora imati stanje."],
    },
    slike: [
      {
        type: String,
        required: [true, "Artikal mora imati slike."],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

artikalSchema.pre("findOne", async function (next) {
  this.populate({
    path: "proizvodjac kategorija",
  });
  next();
});

artikalSchema.virtual("brojSlika").get(function () {
  return this.slike?.length;
});

const Artikal = mongoose.model("Artikal", artikalSchema);

module.exports = Artikal;
