const express = require("express");

const { getCategory } = require("../models/category.model");
const { validateUser, saveUser } = require("../models/user.model");

const g2PageController = express.Router();

g2PageController.get("/", (req, res) => {
  return res.render("g2_page", {
    data: getCategory("g2"),
  });
});
//handle post data and store user object
g2PageController.post("/", async (req, res) => {
  console.log("USER-DATA:", req.body);
  const user = req.body;
  if (validateUser(user)) {
    await saveUser(user);
    return res.status(201).send();
  } else {
    return res.status(400).send();
  }
});
module.exports = g2PageController;
