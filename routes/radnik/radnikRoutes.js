const express = require("express");
const {
  createWorker,
  loginWorker,
  deleteWorker,
} = require("../../controllers/radnik/radnikController");
const isAdmin = require("../../middleware/isAdmin");
const isLoggedIn = require("../../middleware/isLoggedIn");

const radnikRouter = express.Router();

radnikRouter.post("/", isLoggedIn, isAdmin, createWorker);
radnikRouter.post("/login", loginWorker);
radnikRouter.delete("/:id", isLoggedIn, isAdmin, deleteWorker);

module.exports = radnikRouter;
