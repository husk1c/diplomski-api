const appError = require("../../utils/appError");
const Kategorija = require("../../model/Kategorija/Kategorija");
const Podkategorija = require("../../model/Podkategorija/Podkategorija");

async function createSubCategory(req, res, next) {
  const { naziv } = req.body;
  try {
    const kategorija = await Kategorija.findById(req.params.id);
    if (!kategorija) {
      return next(appError("Kategorija nije pronađena."));
    }
    if (!naziv) {
      return next(appError("Unesite naziv podkategorije."));
    }
    const isFound = await Podkategorija.findOne({ naziv });
    if (isFound) {
      return next(appError("Podkategorija već postoji."));
    }
    const created = await Podkategorija.create({ naziv });

    kategorija.podkategorije.push(created._id);
    await kategorija.save();

    res.json({
      status: "success",
      data: created,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function editSubCategory(req, res, next) {
  const { naziv } = req.body;
  try {
    if (!naziv) {
      return next(appError("Unesite naziv podkategorije."));
    }
    const podkategorija = await Podkategorija.findById(req.params.id);
    if (podkategorija.naziv.toString() === naziv.toString()) {
      return next(appError("Unešeni naziv je isti."));
    }
    await Podkategorija.updateOne(
      req.params.id,
      {
        naziv,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: "Podkategorija uspješno editovana.",
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function deleteSubCategory(req, res, next) {
  try {
    const podkateogrija = await Podkategorija.findById(req.params.id);
    await podkateogrija.delete();

    res.json({
      status: "success",
      data: "Podkategorija uspješno izbrisana.",
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function createCategory(req, res, next) {
  const { naziv } = req.body;
  if (!naziv) {
    next(appError("Unesite naziv kategorije."));
  }
  const isFound = await Kategorija.findOne({ naziv });
  if (isFound) {
    next(appError("Kategorija sa ovim nazivom već postoji."));
  }
  const category = await Kategorija.create({ naziv });
  res.json({
    status: "success",
    data: category,
  });
}

async function getAllCategories(req, res, next) {
  try {
    const results = await Kategorija.find();
    if (!results) {
      next(appError("Kategorije nisu pronađene.", 404));
    }
    res.json({
      status: "success",
      data: results,
    });
  } catch (error) {
    next(appError(error.message));
  }
}

async function editCategory(req, res, next) {
  try {
    const { naziv } = req.body;
    const kategorija = await Kategorija.findById(req.params.id);
    if (!kategorija) {
      next(appError("Kategorija nije pronađena", 404));
    }
    await Kategorija.updateOne(
      req.params.id,
      {
        naziv,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: "Kategorija uspješno editovana.",
    });
  } catch (error) {
    next(appError(error.message));
  }
}

async function deleteCategory(req, res, next) {
  try {
    const kateogrija = await Kategorija.findById(req.params.id);
    if (!kateogrija) {
      return next(appError("Kategorija nije pronađena."));
    }
    await kateogrija.delete();

    res.json({
      status: "success",
      data: "Kategorija uspješno izbrisana.",
    });
  } catch (error) {
    return next(appError(error.message));
  }
}

module.exports = {
  createSubCategory,
  editSubCategory,
  deleteSubCategory,
  createCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
};
