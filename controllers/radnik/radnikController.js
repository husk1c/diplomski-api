const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const appError = require("../../utils/appError");
const Radnik = require("../../model/Radnik/Radnik");

async function createWorker(req, res, next) {
  const { ime, prezime, uloga, username, password } = req.body;
  try {
    const exists = await Radnik.findOne({ username });
    if (exists) {
      return next(appError("Username je zauzet."));
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const radnik = await Radnik.create({
      ime,
      prezime,
      uloga,
      username,
      password: passwordHash,
    });
    res.json({
      status: "success",
      data: radnik,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function loginWorker(req, res, next) {
  const { username, password } = req.body;
  try {
    const radnik = await Radnik.findOne({ username });
    if (!radnik) {
      return next(appError("Neispravni login podatci."));
    }

    const isPasswordValid = await bcrypt.compare(password, radnik.password);
    if (!isPasswordValid) {
      return next(appError("Neispravni login podatci."));
    }

    radnik.zadnjiPristup = new Date();
    await radnik.save({ validateBeforeSave: false });

    res.json({
      status: "success",
      data: {
        token: generateToken(radnik._id),
      },
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function deleteWorker(req, res, next) {
  try {
    const radnik = await Radnik.findById(req.params.id);
    await radnik.delete();
    res.json({
      status: "success",
      data: "Radnik je uspješno izbrisan.",
    });
  } catch (error) {
    return next(appError(error.message));
  }
}

module.exports = { createWorker, loginWorker, deleteWorker };
