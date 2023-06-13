const express = require("express");

const { getCategory } = require("../models/category.model");

const loginController = express.Router();

loginController.get("/", (req, res) => {
  return res.render("login", {
    data: getCategory("login"),
  });
});

module.exports = loginController;
