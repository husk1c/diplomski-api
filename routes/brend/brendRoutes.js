const express = require("express");
const {
  createModel,
  editModel,
  deleteModel,
  createBrand,
  getAllBrands,
  editBrand,
  deleteBrand,
} = require("../../controllers/brend/brendController");

const brendRouter = express.Router();

brendRouter.post("/", createBrand);
brendRouter.post("/model", createModel);
brendRouter.get("/", getAllBrands);
brendRouter.put("/:id", editBrand);
brendRouter.put("/model/:id", editModel);
brendRouter.delete("/:id", deleteBrand);
brendRouter.delete("/model/:id", deleteModel);

module.exports = brendRouter;
