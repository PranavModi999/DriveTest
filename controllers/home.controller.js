const express = require("express");

const { getCategory } = require("../models/category.model");

const homeController = express.Router();
//default route redirecting to dashboard
homeController.get("/", (req, res) => res.redirect("/dashboard"));

//Dashboard route
homeController.get("/dashboard", (req, res) => {
  return res.render("index", {
    data: getCategory("dashboard"),
  });
});

module.exports = homeController;
