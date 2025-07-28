const appError = require("../../utils/appError");
const Artikal = require("../../model/Artikal/Artikal");

async function createAd(req, res, next) {
  const {
    naziv,
    opis,
    proizvodjac,
    kategorija,
    garantniPeriod,
    cijena,
    stanje,
  } = req.body;

  try {
    const ad = await Artikal.create({
      naziv,
      opis,
      proizvodjac,
      kategorija,
      garantniPeriod,
      cijena,
      stanje,
    });
    res.json({
      status: "success",
      data: ad,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function uploadPic(req, res, next) {
  try {
    const artikal = await Artikal.findById(req.params.id);
    if (!artikal) {
      return next(appError("Artikal nije pronađen.", 404));
    }
    if (req.file) {
      req.file.forEach((picture) => {
        artikal.slike.push(picture.path);
      });
      res.json({
        status: "success",
        data: "Slike uspješno postavljene.",
      });
    }
  } catch (error) {
    return next(appError(error.message));
  }
}
async function getAllAds(req, res, next) {
  try {
    const ads = await Artikal.find();
    if (!ads) {
      return next(appError("No ads found.", 404));
    }
    res.json({
      status: "success",
      data: ads,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function getAdByID(req, res, next) {
  try {
    const ad = await Artikal.findById(req.params.id);
    if (!ad) {
      return next(appError("Artikal ne postoji.", 404));
    }
    res.json({
      status: "success",
      data: ad,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function editAd(req, res, next) {
  const {
    naziv,
    opis,
    proizvodjac,
    kategorija,
    garantniPeriod,
    cijena,
    stanje,
  } = req.body;
  try {
    const ad = await Artikal.findByIdAndUpdate(
      req.params.id,
      { naziv, opis, proizvodjac, kategorija, garantniPeriod, cijena, stanje },
      { new: true }
    );
    res.json({
      status: "success",
      data: ad,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function deleteAd(req, res, next) {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: `Artikal uspješno izbrisan.`,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}

module.exports = {
  createAd,
  uploadPic,
  getAllAds,
  getAdByID,
  editAd,
  deleteAd,
};
