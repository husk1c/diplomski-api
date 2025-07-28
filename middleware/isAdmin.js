const Radnik = require("../model/Radnik/Radnik");
const appError = require("../utils/appError");

async function isAdmin(req, res, next) {
  try {
    const radnik = Radnik.findById(req.userAuth);
    if (!radnik.uloga === "Admin") {
      return next(appError("Neautorizovani pristup krajnjoj tačci.", 403));
    } else {
      next();
    }
  } catch (error) {
    next(appError(error.message));
  }
}

module.exports = isAdmin;
