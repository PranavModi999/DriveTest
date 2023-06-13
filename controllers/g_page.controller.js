const express = require("express");

const { getCategory } = require("../models/category.model");
const {
  getUserByLicenseNumber,
  updateUserByLicensenumber,
} = require("../models/user.model");

const gPageController = express.Router();

gPageController.get("/", (req, res) => {
  return res.render("g_page", {
    data: getCategory("g"),
  });
});
//G get User Route
gPageController.get("/:licenseNumber", async (req, res) => {
  console.log("Get User:", req.params.licenseNumber);
  const user = await getUserByLicenseNumber(req.params.licenseNumber);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send();
  }
});
//G page Put Update user
gPageController.put("/", (req, res) => {
  console.log(req.body);
  const isSuccess = updateUserByLicensenumber(req.body);
  if (isSuccess) {
    res.status(201).send();
  } else {
    res.status(500).send();
  }
});

module.exports = gPageController;
