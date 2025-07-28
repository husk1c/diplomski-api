const appError = require("../../utils/appError");
const Racun = require("../../model/Racun/Racun");
const Artikal = require("../../model/Artikal/Artikal");
//artikal:ID--radnik:userAuth
async function createReceipt(req, res, next) {
  const {
    kolicina,
    radnik,
    nacinPlacanja,
    imeKupca = null,
    prezimeKupca = null,
    adresaKupca = null,
  } = req.body;

  try {
    const artikal = await Artikal.findById(req.params.id);
    const iznos = kolicina * artikal.cijena;

    const racun = await Racun.create({
      artikal: req.params.id,
      kolicina,
      iznos,
      radnik: req.userAuth,
      nacinPlacanja,
      imeKupca,
      prezimeKupca,
      adresaKupca,
    });
    const krajGarancije = new Date(racun.createdAt);
    krajGarancije.setMonth(krajGarancije.getMonth() + artikal.garantniPeriod);
    racun.istekGarancije = krajGarancije;

    res.json({
      status: "success",
      data: racun,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}

async function getAllReceipts(req, res, next) {
  try {
    const receipts = await Racun.find();
    if (!receipts) {
      return next(appError("Računi nisu pronađeni.", 404));
    }

    res.json({
      status: "success",
      data: receipts,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}

async function getReceiptByID(req, res, next) {
  try {
    const receipt = await Racun.findById(req.params.id);
    if (!receipt) {
      return next(appError("Računi nisu pronađeni.", 404));
    }

    res.json({
      status: "success",
      data: receipt,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
module.exports = {
  createReceipt,
  getAllReceipts,
  getReceiptByID,
};
