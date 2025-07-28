const express = require("express");
const {
  createSubCategory,
  editSubCategory,
  deleteSubCategory,
  createCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
} = require("../../controllers/kategorija/kategorijaController");

const kategorijaRouter = express.Router();

kategorijaRouter.post("/", createCategory);
kategorijaRouter.post("/podkategorija", createSubCategory);
kategorijaRouter.get("/", getAllCategories);
kategorijaRouter.put("/podkategorija/:id", editSubCategory);
kategorijaRouter.put("/:id", editCategory);
kategorijaRouter.delete("/podkategorija/:id", deleteSubCategory);
kategorijaRouter.delete("/:id", deleteCategory);

module.exports = kategorijaRouter;
