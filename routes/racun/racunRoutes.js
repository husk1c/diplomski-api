const express = require("express");
const {
  createReceipt,
  getAllReceipts,
  getReceiptByID,
} = require("../../controllers/racun/racunController");
const isLoggedIn = require("../../middleware/isLoggedIn");

const racunRouter = express.Router();

racunRouter.post("/", createReceipt);
racunRouter.get("/", isLoggedIn, getAllReceipts);
racunRouter.get("/:id", isLoggedIn, getReceiptByID);

module.exports = racunRouter;
