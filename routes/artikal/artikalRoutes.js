const express = require("express");
const {
  createAd,
  uploadPic,
  getAllAds,
  getAdByID,
  editAd,
  deleteAd,
} = require("../../controllers/artikal/artikalController");
const storage = require("../../configs/clodinary");
const multer = require("multer");
const isLoggedIn = require("../../middleware/isLoggedIn");

const artikalRouter = express.Router();

const upload = multer({ storage });

artikalRouter.post("/", isLoggedIn, createAd);
artikalRouter.post(
  "/upload-images",
  isLoggedIn,
  upload.array("artikal-slike"),
  uploadPic
);
artikalRouter.get("/", getAllAds);
artikalRouter.get("/:id", getAdByID);
artikalRouter.put("/:id", isLoggedIn, editAd);
artikalRouter.delete("/:id", isLoggedIn, deleteAd);

module.exports = artikalRouter;
