const appError = require("../../utils/appError");
const Brend = require("../../model/Brend/Brend");
const Model = require("../../model/Model/Model");

async function createModel(req, res, next) {
  const { naziv, godisteStart, godisteEnd } = req.body;
  try {
    const brend = await Brend.findById(req.params.id);
    if (!brend) {
      return next(appError("Brend nije pronađen."));
    }
    if (!naziv) {
      return next(appError("Unesite naziv modela."));
    }
    if (!godisteStart || !godisteEnd) {
      return next(appError("Unesite raspon godišta modela."));
    }
    const isFound = await Model.findOne({ naziv });
    if (isFound) {
      return next(appError("Model već postoji."));
    }
    const created = await Model.create({ naziv });

    brend.modeli.push(created._id);
    await brend.save();

    res.json({
      status: "success",
      data: created,
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function editModel(req, res, next) {
  const { naziv, godisteStart, godisteEnd } = req.body;
  try {
    await Model.updateOne(
      req.params.id,
      {
        naziv,
        godisteStart,
        godisteEnd,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: "Model uspješno editovan.",
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function deleteModel(req, res, next) {
  try {
    const model = await Model.findById(req.params.id);
    await model.delete();

    res.json({
      status: "success",
      data: "Model uspješno izbrisan.",
    });
  } catch (error) {
    return next(appError(error.message));
  }
}
async function createBrand(req, res, next) {
  const { naziv } = req.body;
  if (!naziv) {
    next(appError("Unesite naziv brenda."));
  }
  const isFound = await Brend.findOne({ naziv });
  if (isFound) {
    next(appError("Brend sa ovim nazivom već postoji."));
  }
  const brend = await Brend.create({ naziv });
  res.json({
    status: "success",
    data: brend,
  });
}

async function getAllBrands(req, res, next) {
  try {
    const results = await Brand.find();
    if (!results) {
      next(appError("Brendovi nisu pronađeni.", 404));
    }
    res.json({
      status: "success",
      data: results,
    });
  } catch (error) {
    next(appError(error.message));
  }
}

async function editBrand(req, res, next) {
  try {
    const { naziv } = req.body;
    const brend = await Brend.findById(req.params.id);
    if (!brend) {
      next(appError("Brend nije pronađen.", 404));
    }
    await Brend.updateOne(
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
      data: "Brend uspješno editovan.",
    });
  } catch (error) {
    next(appError(error.message));
  }
}

async function deleteBrand(req, res, next) {
  try {
    const brend = await Brend.findById(req.params.id);
    if (!brend) {
      return next(appError("Brend nije pronađen."));
    }
    await brend.delete();

    res.json({
      status: "success",
      data: "Brend uspješno izbrisan.",
    });
  } catch (error) {
    return next(appError(error.message));
  }
}

module.exports = {
  createModel,
  editModel,
  deleteModel,
  createBrand,
  getAllBrands,
  editBrand,
  deleteBrand,
};
